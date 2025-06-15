import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import './LoginMorador.css';
import logo from '../../IMG/logo/logo_principal.png';

function LoginMorador() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="login-container">
      {/* Lado esquerdo */}
      <div className="login-coluna-esquerda">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Lado direito */}
      <div className="login-coluna-direita">
        <div className="login-info">
          <div className="titulo-login">
            <h1>LOGIN</h1>
            <h1>MORADOR</h1>
          </div>
        </div>

        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="senha-container">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                required
                className="input-senha"
              />
              <i
                className={`fa-solid ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'} icone-olho`}
                onClick={() => setMostrarSenha(!mostrarSenha)}
              ></i>
            </div>
          </div>

          <div className="btn-acess-form">
            <Link to="/tela-principal-morador">
              <button type="button" className="botao-entrar">Entrar</button>
            </Link>
          </div>
        </form>

        <Link to="/">
          <button className="botao-trocar">Alterar Acesso</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginMorador;
