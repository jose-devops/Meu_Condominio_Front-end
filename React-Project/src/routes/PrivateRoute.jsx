import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/authUtils';

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login-proprietario" />;
};

export default PrivateRoute;
