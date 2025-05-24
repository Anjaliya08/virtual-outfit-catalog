import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Agar token nahi mila, login page pe bhej do
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, requested component dikhao
  return children;
};

export default ProtectedRoute;
