import { registrarProprietario } from '../api/proprietarioService';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegistroProprietario.css';

const RegistroProprietario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    razao: '',
    tipo: 'FISICO',
    cpfCnpj: '',
    telefone: '',
    telefoneSecundario: '',
    email: '',
    senha: ''
  });

    const [erroNome, setErroNome] = useState('');
  const [erroCpfCnpj, setErroCpfCnpj] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  
  const [erroGeral, setErroGeral] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });

    // Limpar o erro específico quando o usuário digitar
    switch(name) {
      case 'nome': setErroNome(''); break;
      case 'cpfCnpj': setErroCpfCnpj(''); break;
      case 'email': setErroEmail(''); break;
      case 'senha': setErroSenha(''); break;
      default: break;
    }
  };

  const validarFormulario = () => {
  let valido = true;

  if (!formData.nome) {
    setErroNome('Informe o nome');
    valido = false;
  }
  if (!formData.cpfCnpj) {
    setErroCpfCnpj('Informe o CPF/CNPJ');
    valido = false;
  }
  if (!formData.email) {
    setErroEmail('Informe o e-mail');
    valido = false;
  }
  if (!formData.senha) {
    setErroSenha('Informe a senha');
    valido = false;
  }

  return valido;
};


    const handleSubmit = async (e) => {
    e.preventDefault();

     if (!validarFormulario()) return;

    try {
        await registrarProprietario(formData);
        setSucesso('Cadastro realizado com sucesso!');
        setErroGeral(null);

        setTimeout(() => {
        setSucesso(null);
        navigate('/login-proprietario');
        }, 2000);
    } catch (error) {
        setErroGeral(error.response?.data?.message || 'Erro ao cadastrar proprietário');
        setSucesso(null);
    }
    };

  return (
    <div className="container">
      <div className="card p-4">
        <div className="modal-area">
          <div className="top-bar"></div>
          <form onSubmit={handleSubmit} className="form-container">
            {/* Coluna esquerda */}
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="form-control"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                />

                {erroNome && <span className="mensagem-erro">{erroNome}</span>}

              </div>
              <div className="form-group">
                <label htmlFor="razao">Razão</label>
                <input
                  type="text"
                  id="razao"
                  name="razao"
                  className="form-control"
                  value={formData.razao}
                  onChange={handleChange}
                  placeholder="Razão"
                />
              </div>
              <div className="form-group tipo-radio">
                <div className='radio-buttons'>
                  <label>Tipo:</label>
                  <input
                    type="radio"
                    id="FISICO"
                    name="tipo"
                    value="FISICO"
                    checked={formData.tipo === 'FISICO'}
                    onChange={handleChange}
                  /> Físico
                  <input
                    type="radio"
                    id="JURIDICO"
                    name="tipo"
                    value="JURIDICO"
                    checked={formData.tipo === 'JURIDICO'}
                    onChange={handleChange}
                  /> Jurídico
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cpfCnpj">CPF / CNPJ</label>
                <input
                  type="text"
                  id="cpfCnpj"
                  name="cpfCnpj"
                  className="form-control"
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  placeholder="CPF / CNPJ"
                />

                {erroCpfCnpj && <span className="mensagem-erro">{erroCpfCnpj}</span>}


              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  className="form-control"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefoneSecundario">Telefone Secundário</label>
                <input
                  type="tel"
                  id="telefoneSecundario"
                  name="telefoneSecundario"
                  className="form-control"
                  value={formData.telefoneSecundario}
                  onChange={handleChange}
                  placeholder="Telefone Secundário"
                />
              </div>
            </div>

            {/* Linha central */}
            <div className="linha-central"></div>

            {/* Coluna direita */}
            <div className="form-right">
              <div className='NameFormRegister'>
                <h1>CADASTRO DE</h1>
                <h1>PROPRIETÁRIO</h1>
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                />

                {erroEmail && <span className="mensagem-erro">{erroEmail}</span>}


              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  className="form-control"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Senha"
                />

                {erroSenha && <span className="mensagem-erro">{erroSenha}</span>}


              </div>
              <div className="buttom-register-area">
                <button type="submit">CADASTRAR</button>
              </div>
              <div className='back-to-login-area'>
                <p className="login-texto">
                  Já possui uma conta? <Link to="/login-proprietario">ENTRAR</Link>
                </p>
              </div>
            </div>
          </form>

        </div>

                  {/* Mensagem geral de erro (toast) */}
          {erroGeral && (
            <div className="toast-erro-personalizado">
              <div className="toast-barra-lateral"></div>
              <div className="toast-conteudo">
                <div className="text-toats">
                  <span className="toast-texto">{erroGeral}</span>
                </div>
              </div>
              <span className="toast-fechar" onClick={() => setErroGeral(null)}>×</span>
            </div>
          )}

          {/* Mensagem de sucesso */}
        {sucesso && (

        <div className="toast-sucesso-personalizado">
            <div className="toast-barra-lateral-sucesso"></div>
            <div className="toast-conteudo">
              <div className="text-toats">
                <span className="toast-texto-sucesso">{sucesso}</span>
              </div>
            </div>
            <span className="toast-fechar" onClick={() => setSucesso('')}>
              ×
            </span>
        </div>
        )}



      </div>
    </div>
  );
};

export default RegistroProprietario;
