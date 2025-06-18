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



export async function cadastrarImovel(imovel, token) {
  try {
    const response = await axios.post(`${BASE_URL}/cadastrar`, imovel, {
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


export const listarImoveis = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:8080/imovel/listar', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};



export const atualizarImovel = async (imovelData, token) => {
  const response = await axios.put(
    `http://localhost:8080/imovel/alterar/${imovelData.id}`,
    imovelData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};



export const deletarImovelProprietario = (id, token) => {
  return axios.delete(`http://localhost:8080/imovel/deletar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};