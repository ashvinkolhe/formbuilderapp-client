/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import buttonIcon from './../../assets/AuthPage/Google Icon.svg';
import withTheme from "../../components/ThemeComponent/ThemeComponent";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from './../../assets/Loading/loading.gif';

const SignIn = () => {
  const redirectTo = location.state?.from?.pathname || "/workspace";
  const [loading, setLoading] = useState(false);

  const formFields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Invalid email format",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "**********",
      required: true,
      validate: value => value.length >= 6,
      errorMessage: "Password must be at least 6 characters",
    },
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("https://formbuilderapp-server.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Sending data in the request body
      });

      const responseData = await response.json(); // Parse response to JSON

      setLoading(false);

      if (response.status === 200) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("id", responseData.id);
        
        // Show success message before redirecting
        toast.success("Successfully logged in.");

        // Ensure toast is shown before redirecting by adding a small delay
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 1500);  // Wait for 1.5 seconds before redirecting
      } else {
        toast.error(responseData.message || "An error occurred during login. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel="Log In" />
      <p className="centerText">OR</p>
      <button 
        onClick={() => toast.info("Sign-in with Google is coming soon.")}
        className="AuthButton"
      >
        <img src={buttonIcon} alt="Google Icon" />
        Sign In with Google
      </button>
      <p className="centerText">
        Don’t have an account? <mark><Link to="/register">Register now</Link></mark>
      </p>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <img src={Loading} className="loading" alt="Loading" />
        </div>
      )}
    </>
  );
};

const Login = () => (
  <AuthLayout>
    <SignIn />
  </AuthLayout>
);

export default withTheme(Login);
