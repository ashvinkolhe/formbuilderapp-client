import React from 'react';
import Form from './Form';
import styles from './Settings.module.css';
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import { name, email, password, hidePassword, unhidePassword } from './../../assets/FormComponents/index';
import LogOut from './../../assets/Settings/Logout.svg';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import { toast } from 'react-toastify';

function SettingsPage() {
    const { token } = useToken();
    const navigate = useNavigate();

    const formFields = [
        {
            name: "name",
            type: "text",
            required: false,
            validate: (value) => value.length >= 3 || value === "",
            errorMessage: "Username should be at least 3 characters",
            icon: name
        },
        {
            name: "email",
            type: "email",
            required: false,
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value === "",
            errorMessage: "Please enter a valid email address",
            icon: email
        },
        {
            name: "oldPassword",
            type: "password",
            required: false,
            validate: (value) => value.length >= 6 || value === "",
            errorMessage: "Password must be at least 6 characters long",
            icon: password,
            hidePassword: hidePassword,
            unhidePassword: unhidePassword,
        },
        {
            name: "newPassword",
            type: "password",
            required: false,
            validate: (value, formValues) => {
                const oldPasswordField = formValues.oldPassword;
                if (value) {
                    return oldPasswordField && value.length >= 6;
                }
                return true;
            },
            errorMessage: "New password must be at least 6 characters long and Old password cannot be empty if New password is filled.",
            icon: password,
            hidePassword: hidePassword,
            unhidePassword: unhidePassword,
        }
    ];

    const handleSubmit = async (data) => {
        try {
            const response = await fetch('https://formbuilderapp-server.onrender.com/secure/settings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                toast.success(responseData.message);
                window.location.href = from; // Update this based on the actual redirect logic
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update settings.");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error("Error submitting settings:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Settings</h1>
            </div>
            <div className={styles.body}>
                <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Update"} />
            </div>
            <div className={styles.footer}>
                <button onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    navigate('/signIn');
                }}>
                    <img src={LogOut} alt='logOut' /> Log out
                </button>
            </div>
        </div>
    );
}

export default withTheme(SettingsPage);
