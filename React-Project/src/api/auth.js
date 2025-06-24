import axios from 'axios';

const BASE_URL = 'http://localhost:8080/auth';  // URL base para autenticação

// Método para login do Morador
export const loginMorador = async (email, senha) => {
  const loginUrl = `${BASE_URL}/login-morador`;

  try {
    const response = await axios.post(loginUrl, { email, senha });
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
    }

    return token;
  } catch (error) {
    console.error('Erro ao realizar o login do Morador:', error);
    throw new Error('Login falhou! Verifique suas credenciais.');
  }
};

// Método para login do Proprietário
export const loginProprietario = async (email, senha) => {
  const loginUrl = `${BASE_URL}/login-proprietario`;

  try {
    const response = await axios.post(loginUrl, { email, senha });
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
    }

    return token;
  } catch (error) {
    console.error('Erro ao realizar o login do Proprietário:', error);
    throw new Error('Login falhou! Verifique suas credenciais.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');  // Remove o token do localStorage ao fazer logout
};
