import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  loginData: any; // يمكن تحديد النوع بناءً على محتوى loginData
  children: ReactNode;
}

const ProtectedRoute = ({ loginData, children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token && loginData;

  if (isLoggedIn) {
    return <>{children}</>; // Render children if user is logged in
  } else {
    console.warn("Unauthorized access attempt detected."); // Log unauthorized access
    return <Navigate to="/login" replace />; // Redirect to login, replace history
  }
};


export default ProtectedRoute;

