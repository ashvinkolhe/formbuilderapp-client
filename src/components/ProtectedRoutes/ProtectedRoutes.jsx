import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ element, isPublic = false }) => {
    const token = localStorage.getItem('token'); 
    const location = useLocation(); 

    if (isPublic && token) {
        const from = location.state?.from?.pathname || '/workspace';
        return <Navigate to={from} replace />;
    }

    if (!isPublic && !token) {
        return <Navigate to="/signIn" state={{ from: location }} replace />;
    }

    return <>{element}</>;
};

export default ProtectedRoutes;
