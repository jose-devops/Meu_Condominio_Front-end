import axios from 'axios';

const ESPECIALIDADE = 'http://localhost:8080/enums/especialidade-prestador';
const BASE_URL = 'http://localhost:8080/prestadores';

export const listarEspecialidade = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(ESPECIALIDADE, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};



export async function cadastrarPrestador(prestador) {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${BASE_URL}/cadastrar`, prestador, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}


export async function listarPrestadores() {
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



export async function editarPrestador(prestador) {
  const token = localStorage.getItem('token');
  const { id, ...dados } = prestador; // separa o ID

  try {
    const response = await axios.put(
      `http://localhost:8080/prestadores/atualizar/${id}`,
      dados,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}






export async function deletarPrestador(id) {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:8080/prestadores/deletar/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar prestador');
  }

  return true;
}