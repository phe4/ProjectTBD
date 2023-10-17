// RoleGuard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate  } from 'react-router-dom';

const AuthGuard = ({ requiredRole, children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/home" />;
  } 

  return children;
};

export default AuthGuard;
