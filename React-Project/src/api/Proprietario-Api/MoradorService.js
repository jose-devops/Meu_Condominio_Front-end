import axios from 'axios';

const BASE_URL = 'http://localhost:8080/morador';
const MORADORES_URL = 'http://localhost:8080/morador/listar';  // A URL da API de moradores


const getToken = () => {
  return localStorage.getItem('token');
};

export const cadastrarMorador = async (dadosMorador) => {
        const token = getToken();  // Pega o token do localStorage
  
            // Caso não haja token, você pode tratar como um erro
            if (!token) {
                throw new Error("Token não encontrado.");
        }

  const payload = {
    nome: dadosMorador.nome,
    status: dadosMorador.status,
    cpf: dadosMorador.cpf,
    email: dadosMorador.email,
    senha: dadosMorador.senha,
    rendaMensal: dadosMorador.rendaMensal,
    profissao: dadosMorador.profissao,
    observacao: dadosMorador.observacao,
    dataAniversario: dadosMorador.dataAniversario,
    telefonePrincipal: dadosMorador.telefonePrincipal,
    telefoneSecundario: dadosMorador.telefoneSecundario,
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/cadastrar-por-proprietario`,
      payload,
      {
        headers: {
            Authorization: `Bearer ${token}`,  // Incluindo o token no header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar morador:', error);
    throw error;
  }
};


export const listarInquilinos = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:8080/morador/listar', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export const editarInquilino = async (id, dadosInquilino) => {
  const token = localStorage.getItem('token'); // ✅ captura local
  const response = await axios.put(`http://localhost:8080/morador/atualizar/${id}`, dadosInquilino, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};



export const deletarInquilino = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`http://localhost:8080/morador/deletar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};



