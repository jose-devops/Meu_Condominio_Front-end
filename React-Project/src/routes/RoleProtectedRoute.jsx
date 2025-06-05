import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getTipoAcesso } from '../utils/authUtils';

const RoleProtectedRoute = ({ children, allowedRoles }) => {

  if (!isLoggedIn()) {
    return <Navigate to="/login-proprietario" replace />;
  }

  const userRole = getTipoAcesso();

  // Se o tipo de acesso não é válido, redireciona para a página de tipo de acesso
if (!allowedRoles.includes(userRole)) {
  return <Navigate to="/" replace />;
}

  return children;
};

export default RoleProtectedRoute;

