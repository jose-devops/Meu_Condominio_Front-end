/*IMPORTS API*/
import { login } from '../../../api/auth';
import { saveToken } from '../../../utils/authUtils';

/* IMPORTS INTERFACE*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginProprietario.css';
import logo from '../../IMG/logo/logo_principal.png';

function LoginProprietario() {
  const navigate = useNavigate(); // Inicializa o hook navigate

  //API
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  // Função para tratar o clique no botão "Entrar"
  //API
const handleLoginClick = async () => {
  setErro(null); // limpa erro anterior, se existir

  if (!email || !senha) {
    setErro('Preencha todos os campos!');
    return;
  }

  try {
    const token = await login(email, senha);
    saveToken(token);
    navigate('/tela-principal');
  } catch (err) {
    console.error('Erro ao logar:', err);
    setErro('E-mail ou senha inválidos');
  }
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

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
