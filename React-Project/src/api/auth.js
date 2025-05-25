import axios from 'axios';

export const login = async (email, senha) => {
  const response = await axios.post('http://localhost:8080/usuario/login', {
    email,
    senha
  });

  return response.data.token; // O backend deve retornar { token: "JWT..." }
};

export const logout = () => {
  localStorage.removeItem('token');
};
