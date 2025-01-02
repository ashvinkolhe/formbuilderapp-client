import axios from 'axios';
import { toast } from 'react-toastify';
const domain = import.meta.env.VITE_API_URL;

const Api = async ({ endpoint, method = 'GET', data = {}, headers = {},includeToken = false }) => {
    try {
        const token = localStorage.getItem("token") || ""
        let config;
        if(!includeToken){
            config = {
                url: `${domain}${endpoint}`,
                method,
                headers,
                data,
            };
        }
        else{config = {
            url: `${domain}${endpoint}`,
            method,
            headers:{
                Authorization:  `Bearer ${token}`,
                ...headers
            },
            data,
        };}
        const response = await axios(config);
        return response; 
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                // Token is invalid or expired, handle 401 here
                localStorage.removeItem('token'); // Remove invalid token
                toast.error("Session expired. Please log in again.");
                window.location.href = '/signIn';  // Redirect to login page
            } else {
                // Handle other errors (e.g., 400, 404, etc.)
                toast.error(error.response.data.message ||error.response.data.error || "An error occurred!");
            }
            return error.response;
        } else if (error.request) {
            // Handle no response from server
            toast.error("Server not responding. Please try again later.");
            return { status: 500, data: { error: "Server not responding. Please try again later." } };
        } else {
            // Handle unexpected errors
            toast.error(error.message || "An unexpected error occurred.");
            return { status: 500, data: { error: error.message } };
        }
    }
};

export default Api;