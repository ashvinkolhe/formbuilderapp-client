// App.jsx
import React from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemedLandingPage } from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import WorkSpace from './pages/WorkSpace/WorkSpace';
import FormPage from './pages/FormPage/FormPage';
import { useTheme } from './context/ThemeContext';
import FormSubmit from './pages/FormSubmit/FormSubmit';
import Response from './pages/Response/Response';
import SharedPage from './pages/SharedPage/SharedPage';

function App() {
  const { theme } = useTheme();
  const themeStyle = theme ? "dark" : "light";
  const userId = localStorage.getItem("id");

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThemedLandingPage theme={"dark"} />} />
          <Route path="/SignIn" element={<Login theme={"dark"} />} />
          <Route path="/Register" element={<RegisterPage theme={"dark"} />} />
          <Route path="/settings" element={<SettingsPage theme={themeStyle} />} />
          {/* Handle workspace redirection better */}
          <Route path="/workspace" element={userId ? <Navigate to={`/${userId}/workspace`} /> : <Navigate to="/signIn" />} />
          <Route path="/:dashboardId/workSpace/" element={<WorkSpace theme={themeStyle} />} />
          <Route path="/:dashboardId/workspace/:FolderId" element={<WorkSpace theme={themeStyle} />} />
          <Route path="/:dashboardId/workspace/:FolderId/createForm" element={<FormPage mode={"create"} theme={themeStyle} />} />
          <Route path="/:dashboardId/workspace/:FolderId/editForm/:FormId" element={<FormPage mode={"edit"} theme={themeStyle} />} />
          <Route path="/:dashboardId/workspace/:FolderId/responses/:FormId" element={<Response theme={themeStyle} />} />
          <Route path="/FormSubmit/:FormId" element={<FormSubmit />} />
          <Route path="/getPermission/:data" element={<SharedPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
