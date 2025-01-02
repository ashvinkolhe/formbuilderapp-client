import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SharedPage() {
    const { data } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function

    const getRights = async () => {
        try {
            const response = await fetch(`https://formbuilderapp-server.onrender.com/secure/dashboard/verifyLink/${data}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in the request header
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                toast.success("Rights allocated to user, redirecting in 3 seconds..."); // 3 seconds delay
                setTimeout(() => {
                    navigate('/workspace'); // Redirect to the /workspace page
                }, 3000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to allocate rights. Please try again.");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error("Error fetching rights:", error);
        }
    };

    useEffect(() => {
        getRights();
    }, []); // Run on mount

    return (
        <div>
        </div>
    );
}

export default SharedPage;
