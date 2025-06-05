import axios from 'axios';

const BASE_URL = 'http://localhost:8080/agendamentos';


export const listarTiposAgendamento = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:8080/enums/tipo-agendamento', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const listarStatusAgendamento = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:8080/enums/status-agendamento', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const cadastrarAgendamentoProprietario = async (dadosAgendamentoProprietario) => {
  const token = localStorage.getItem('token'); 

  const payload = {
    descricao: dadosAgendamentoProprietario.descricao,
    tipoAgendamento: dadosAgendamentoProprietario.tipoAgendamento,
    local: dadosAgendamentoProprietario.local,
    status: dadosAgendamentoProprietario.status,
    dataInicio: dadosAgendamentoProprietario.dataInicio,
    dataFim: dadosAgendamentoProprietario.dataFim,
    observacao: dadosAgendamentoProprietario.observacao,
    proprietarioId: dadosAgendamentoProprietario.proprietarioId
  };

  const response = await axios.post('http://localhost:8080/agendamentos/cadastrar', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  return response.data;
};


export const listarAgendamentosProprietario = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${BASE_URL}/listar`, config);
  return response.data;
};

export const editarAgendamentoProprietario = (dados) => {
  const token = localStorage.getItem('token');
  return axios.put(`${BASE_URL}/alterar/${dados.id}`, dados, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);
};


export const deletarAgendamentoProprietario = (id, token) => {
  return axios.delete(`${BASE_URL}/deletar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};