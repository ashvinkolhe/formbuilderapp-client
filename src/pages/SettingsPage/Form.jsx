import React, { useState } from "react";
import styles from './style.module.css';
import { hidePassword, unhidePassword } from './../../assets/FormComponents/index';

const Form = ({ fields, onSubmit, buttonLabel }) => {
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState({}); // Object to handle visibility of each password field

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      } else if (
        field.validate &&
        !field.validate(formValues[field.name], formValues)
      ) {
        newErrors[field.name] = field.errorMessage || "Invalid value";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const filteredValues = Object.fromEntries(
        Object.entries(formValues).filter(([_, value]) => value !== "")
      );
      onSubmit(filteredValues);
    }
  };

  const togglePasswordVisibility = (name) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [name]: !prev[name], // Toggle visibility for the specific password field
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className={styles.form}>
          <div className={styles.upper}>
            <img className={styles.icons} src={field.icon} alt="icon" />
            <input
              type={
                field.type === "password" && !passwordVisible[field.name]
                  ? "password"
                  : "text"
              }
              id={field.name}
              name={field.name}
              value={formValues[field.name]}
              onChange={handleChange}
              placeholder={field.name}
            />
            {field.type === "password" && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                className={styles.passwordToggle}
              >
                <img
                  src={passwordVisible[field.name] ? hidePassword : unhidePassword}
                  className={styles.password}
                  alt={passwordVisible[field.name] ? "hide" : "show"}
                />
              </button>
            )}
          </div>
          {errors[field.name] && (
            <span className={styles.error}>{errors[field.name]}</span>
          )}
        </div>
      ))}
      <button className={styles.AuthButton} type="submit">
        {buttonLabel}
      </button>
    </form>
  );
};

export default Form;
