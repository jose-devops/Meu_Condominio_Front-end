
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/contratos';
const IMOVEIS_URL = 'http://localhost:8080/imovel/listar'; // URL para a listagem de imóveis
const MORADORES_URL = 'http://localhost:8080/morador/listar'; // URL para a listagem de moradores
const STATUS_CONTRATO_URL = 'http://localhost:8080/enums/status-contrato';
const CONTRATO_CADASTRAR_URL = 'http://localhost:8080/contratos/cadastrar';



// Função para listar os contratos
export const listarContratos = async () => {
  const token = localStorage.getItem('token'); 
  const response = await axios.get(`${BASE_URL}/listar`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Função para cadastrar um contrato
export const cadastrarContrato = async (contratoData, arquivo) => {

  const token = localStorage.getItem('token');

  const formData = new FormData();
  const contratoBlob = new Blob([JSON.stringify(contratoData)], {
    type: 'application/json'
  });
  formData.append('contrato', contratoBlob, 'contrato.json');


  if (arquivo) {
    formData.append('arquivo', arquivo);
  }

  const response = await axios.post(`${BASE_URL}/cadastrar`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
  
    }
  });

  return response.data;
};



// Função para listar imóveis
export const listarImoveis = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(IMOVEIS_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Função para listar moradores
export const listarMoradores = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(MORADORES_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const listarStatusContrato = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(STATUS_CONTRATO_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};



// Função para excluir um contrato
export const excluirContrato = async (id) => {
  const token = localStorage.getItem('token');
const response = await axios.delete(`${BASE_URL}/deletar/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

  return response.data;
};
