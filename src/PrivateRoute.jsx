import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token"); 
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null; 
  if (!token) {
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/user'} />;
  }
  return children;
};

export default PrivateRoute;
