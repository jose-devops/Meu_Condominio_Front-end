import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import './LoginMorador.css';
import logo from '../../IMG/logo/logo_principal.png';

function LoginMorador() {
  return (
    <div className="login-container">
      {/* Lado esquerdo */}
      <div className="login-coluna-esquerda">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Lado direito */}
      <div className="login-coluna-direita">
        <h3 className="login-titulo">LOGIN DE <br />MORADOR</h3>

        <form className="login-form">
          <label>Email</label>
          <input type="email" required />

          <label>Senha</label>
          <input type="password" required />

          <button type="submit" className="botao-entrar">Entrar</button>
        </form>

    
        <Link to="/">
          <button className="botao-trocar">TROCAR ACESSO</button> 
        </Link>
      </div>
    </div>
  );
}

export default LoginMorador;
