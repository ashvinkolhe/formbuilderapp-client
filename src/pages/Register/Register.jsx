/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import buttonIcon from './../../assets/AuthPage/Google Icon.svg';
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { toast } from 'react-toastify';
import Loading from './../../assets/Loading/loading.gif';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  const formFields = [
    {
      name: "name",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      required: true,
      validate: (value) => value.length >= 3,
      errorMessage: "Username should be at least 3 characters",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Please enter a valid email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "**********",
      required: true,
      validate: (value) => value.length >= 6,
      errorMessage: "Password must be at least 6 characters long",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "**********",
      required: true,
      validate: (value, formValues) => value === formValues.password,
      errorMessage: "Passwords do not match",
    },
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    const { confirmPassword, ...finalData } = data;

    try {
      // Replace with fetch to the backend
      const response = await fetch("https://formbuilderapp-server.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.status === 201) {
        toast.success("Your account has been successfully created.");
        // Redirect to the login page after successful registration
        navigate('/signin');
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to register. Please check your network or try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel="Sign Up" />
      <p className="centerText">OR</p>
      <button
        onClick={() => toast.info("Sign in with Google functionality coming soon.")}
        className="AuthButton"
      >
        <img src={buttonIcon} alt="Google Icon" />
        Sign In with Google
      </button>
      <p className="centerText">
        Already have an account? <mark><Link to="/signin">Login</Link></mark>
      </p>
      {loading && (
        <div style={{ alignSelf: 'center' }}>
          <img src={Loading} className="loading" alt="loading" />
        </div>
      )}
    </>
  );
};

const RegisterPage = () => (
  <AuthLayout>
    <SignUp />
  </AuthLayout>
);

export default withTheme(RegisterPage);
