import axios from 'axios';

const BASE_URL = 'http://localhost:8080/usuario';

export const login = async (email, senha) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    email,
    senha
  });

  const token = response.data.token;

  if (token) {
    localStorage.setItem('token', token); 
  }

  return token;
};

export const logout = () => {
  localStorage.removeItem('token');
};
