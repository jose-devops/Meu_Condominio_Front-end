import axios from 'axios';

const BASE_URL = 'http://localhost:8080/contratos';

export const listarContratoMorador = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${BASE_URL}/listar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};