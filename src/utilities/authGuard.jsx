// RoleGuard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ requiredRole, children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading) !== 'idle';
  if (isLoading) {
    return <div>Loading...</div>; // or return a spinner/loading component
  }

  if (!user || !requiredRole.includes(user.role)) {
    // Unauthorized
    return <Navigate to="/" />;
  } 

  return children;
};

export default AuthGuard;
