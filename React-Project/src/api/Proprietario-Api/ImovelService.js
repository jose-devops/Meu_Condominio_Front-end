import axios from 'axios';

const BASE_URL = 'http://localhost:8080/imovel';


export const listarStatusImovel = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:8080/enums/status-imovel', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};;


export const listarMoradores = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:8080/morador/listar', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const buscarProprietarioLogado = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:8080/proprietario/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};