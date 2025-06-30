import axios from 'axios';
const BASE_URL = 'http://localhost:8080/prestadores';


export async function listarPrestadoresMorador() {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${BASE_URL}/listar`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao listar prestadores:", error);
    throw error.response?.data || error.message;
  }
}