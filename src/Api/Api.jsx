import axios from 'axios';
import { toast } from 'react-toastify';

const domain = import.meta.env.VITE_API_URL;

const Api = async ({ endpoint, method = 'GET', data = {}, headers = {}, includeToken = false }) => {
    try {
        const token = includeToken ? localStorage.getItem("token") : null;

        const config = {
            url: `${domain}${endpoint}`,
            method,
            headers: {
                ...(includeToken && { Authorization: `Bearer ${token}` }),
                ...headers
            },
            data
        };

        const response = await axios(config);
        return response;

    } catch (error) {
        if (error.response) {
            // Handle errors with a server response
            if (error.response.status === 401) {
                // Unauthorized - handle token issues
                localStorage.removeItem('token');
                toast.error("Session expired. Please log in again.");
                window.location.href = '/signIn';
            } else {
                toast.error(error.response.data.message || "An error occurred.");
            }
            return error.response;
        } else if (error.request) {
            // Handle no response from server
            toast.error("Server not responding. Please try again later.");
            return { status: 500, data: { error: "Server not responding." } };
        } else {
            // Handle unexpected errors
            toast.error(error.message || "An unexpected error occurred.");
            return { status: 500, data: { error: error.message } };
        }
    }
};

export default Api;
