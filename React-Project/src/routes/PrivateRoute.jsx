import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getUserRole } from '../utils/authUtils';  // Supondo que temos uma função para pegar o tipo de acesso (role)

const PrivateRoute = ({ children }) => {
  // Verifica se o usuário está autenticado e se tem o tipo de acesso correto
  const role = getUserRole(); // Função que retorna o tipo de usuário, pode ser 'MORADOR' ou 'PROPRIETARIO'

  if (!isLoggedIn()) {
    // Se não estiver autenticado, redireciona para a tela de login do tipo correto
    if (role === 'MORADOR') {
      return <Navigate to="/login-morador" />;  // Redireciona para o login do Morador
    } else {
      return <Navigate to="/login-proprietario" />;  // Redireciona para o login do Proprietário
    }
  }

  return children;  // Se o usuário estiver autenticado, renderiza as rotas protegidas
};

export default PrivateRoute;
