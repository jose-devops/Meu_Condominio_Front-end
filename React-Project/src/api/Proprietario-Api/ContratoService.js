
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/contratos';
const IMOVEIS_URL = 'http://localhost:8080/imovel/listar'; // URL para a listagem de imóveis
const MORADORES_URL = 'http://localhost:8080/morador/listar'; // URL para a listagem de moradores
const STATUS_CONTRATO_URL = 'http://localhost:8080/enums/status-contrato';
const CONTRATO_CADASTRAR_URL = 'http://localhost:8080/contratos/cadastrar';



// Função para listar os contratos
export const listarContratos = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Função para cadastrar um contrato
// contratoService.js
export const cadastrarContrato = async (contratoData, arquivo) => {
  const token = localStorage.getItem('token');
  
  const formData = new FormData();
  
  // 1. Adiciona o JSON do contrato como Blob
  const contratoBlob = new Blob([JSON.stringify(contratoData)], {
    type: 'application/json'
  });
  formData.append('contrato', contratoBlob, 'contrato.json');

  // 2. Adiciona o arquivo
  if (arquivo) {
    formData.append('arquivo', arquivo);
  }

  const response = await axios.post(`${BASE_URL}/cadastrar`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      // O Axios define automaticamente 'Content-Type: multipart/form-data'
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

/* Função para editar um contrato
export const editarContrato = async (id, dadosContrato) => {
  const token = localStorage.getItem('token');
  const payload = {
    nome: dadosContrato.nome,
    dataInicio: dadosContrato.dataInicio,
    dataFim: dadosContrato.dataFim,
    valor: dadosContrato.valor,
  };

  const response = await axios.put(`${BASE_URL}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
*/

// Função para excluir um contrato
export const excluirContrato = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
