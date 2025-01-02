import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import deleteIcon from './../../assets/Workspace/delete.svg';
import { buttons as buttonIcon } from './../../assets/FormPage';
import { useForm } from './../../context/FormContext';
import { v4 as uuidv4 } from 'uuid'; // Unique ID generator

function ButtonInFlow({ type, label }) {
  const { form, setForm } = useForm();
  const object = {
    name: "Button",
    icon: buttonIcon,
    placeholder:
      "Hint: User will select one of many buttons and select what response it wants to give. Add the choices below.",
  };

  const [buttonFields, setButtonFields] = useState([]);

  // Sync buttonFields with form state
  useEffect(() => {
    const element = form.elements.find((el) => el.label === label);
    if (element && element.buttonValues) {
      setButtonFields(element.buttonValues.length > 0 ? element.buttonValues : [{ id: uuidv4(), value: '' }]);
    }
  }, [form, label]);

  const deleteButton = (label) => {
    setForm((prevData) => ({
      ...prevData,
      elements: prevData.elements.filter((item) => item.label !== label),
    }));
  };

  const handleInputChange = (e, id) => {
    const { value } = e.target;

    // Update local state
    const updatedFields = buttonFields.map((button) =>
      button.id === id ? { ...button, value } : button
    );
    setButtonFields(updatedFields);

    // Update global state
    setForm((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.label === label
          ? { ...element, buttonValues: updatedFields }
          : element
      ),
    }));
  };

  const addTextField = () => {
    const newButton = { id: uuidv4(), value: '' };
    const updatedFields = [...buttonFields, newButton];
    setButtonFields(updatedFields);

    // Update global state
    setForm((prevData) => ({
      ...prevData,
      elements: prevData.elements.map((element) =>
        element.label === label
          ? { ...element, buttonValues: updatedFields }
          : element
      ),
    }));
  };

  const removeTextField = (id) => {
    if (buttonFields.length > 1) {
      const updatedFields = buttonFields.filter((button) => button.id !== id);
      setButtonFields(updatedFields);

      // Update global state
      setForm((prevData) => ({
        ...prevData,
        elements: prevData.elements.map((element) =>
          element.label === label
            ? { ...element, buttonValues: updatedFields }
            : element
        ),
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteButton(label);
        }}
        className={styles.deleteIcon}
      >
        <img src={deleteIcon} alt="delete icon" />
      </div>
      <span>{label}</span>
      <div className={styles.input}>
        {buttonFields.map((button, index) => (
          <div key={button.id} className={styles.inputGroup}>
            <img src={object.icon} alt={object.name} />
            <input
              type="text"
              placeholder={`${object.placeholder} (Field ${index + 1})`}
              aria-label={`Button field ${button.id}`}
              value={button.value}
              onChange={(e) => handleInputChange(e, button.id)}
            />
            <button
              type="button"
              onClick={() => removeTextField(button.id)}
              disabled={buttonFields.length === 1}
            >
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={addTextField}>
          Add more
        </button>
        <p>{object.placeholder}</p>
      </div>
    </div>
  );
}

export default ButtonInFlow;
