import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe o useNavigate
import './LoginProprietario.css';
import logo from '../../IMG/logo/logo_principal.png';

function LoginProprietario() {
  const navigate = useNavigate(); // Inicializa o hook navigate

  // Função para tratar o clique no botão "Entrar"
  const handleLoginClick = () => {
    // Aqui você pode adicionar a lógica de validação de login, se necessário
    navigate('/tela-principal'); // Redireciona para a tela principal
  };

  return (
    <div className="login-container">
      {/* Lado esquerdo */}
      <div className="login-coluna-esquerda">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Lado direito */}
      <div className="login-coluna-direita">
        <h3 className="login-titulo">LOGIN DE <br />PROPRIETÁRIO</h3>

        <form className="login-form">
          <label>Email</label>
          <input type="email" required />

          <label>Senha</label>
          <input type="password" required />

          {/* Botão Entrar que chama o handleLoginClick */}
          <button type="button" className="botao-entrar" onClick={handleLoginClick}>Entrar</button>
        </form>

        <p className="registro-texto">
          Não possui cadastro? <Link to="/registro-proprietario" className="link-registro">REGISTRE-SE</Link>
        </p>

        {/* Link para a tela de Tipo de Acesso */}
        <Link to="/">
          <button className="botao-trocar">TROCAR ACESSO</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginProprietario;
