// src/api/proprietarioService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/auth';

export const registrarProprietario = async (dadosProprietario) => {
 
  const payload = {
    nome: dadosProprietario.nome,
    razaoSocial: dadosProprietario.razao,
    tipoPessoa: dadosProprietario.tipo, 
    cpfCnpj: dadosProprietario.cpfCnpj,
    telefonePrincipal: dadosProprietario.telefone,
    telefoneSecundario: dadosProprietario.telefoneSecundario,
    email: dadosProprietario.email,
    senha: dadosProprietario.senha,
  };

  const response = await axios.post(`${BASE_URL}/registrar-proprietario`, payload);
  return response.data;
};
