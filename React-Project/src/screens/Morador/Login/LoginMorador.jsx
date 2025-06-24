import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginMorador.css';
import logo from '../../IMG/logo/logo_principal.png';
import Splash from '../../Components/SplashScreen';
import { loginMorador } from '../../../api/auth';  // Importando a função de login do Morador
import { saveToken } from '../../../utils/authUtils';





function LoginMorador() {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();  // Hook para navegação programática




  const handleLoginClick = async () => {
    setErro(null);
    setErroEmail('');
    setErroSenha('');
  
    let erroLocal = false;
  
    if (!email) {
      setErroEmail('Informe o E-mail');
      erroLocal = true;
    }
  
    if (!senha) {
      setErroSenha('Informe a Senha');
      erroLocal = true;
    }
  
    if (erroLocal) return;
    
    try {
      const token = await loginMorador(email, senha);  // Passa 'MORADOR' para o login
      saveToken(token);
      localStorage.setItem('tipoAcesso', 'MORADOR');  // Armazena o tipo de acesso no localStorage
      navigate('/SplashScreen');  

    } catch (err) {
      setErro('E-mail ou senha inválidos');
      setTimeout(() => setErro(null), 2000);
    }
  };

  return (
    <div className="login-container">
      {loading && <Splash />}

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
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value) setErroEmail('');
              }}
              required
            />
            {erroEmail && <span className="mensagem-erro">{erroEmail}</span>}
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="senha-container">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (e.target.value) setErroSenha('');
                }}
                required
                className="input-senha"
              />
              <i
                className={`fa-solid ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'} icone-olho`}
                onClick={() => setMostrarSenha(!mostrarSenha)}
              ></i>
            </div>
            {erroSenha && <span className="mensagem-erro">{erroSenha}</span>}
          </div>

          <div className="btn-acess-form">
        
            <button type="button" className="botao-entrar" onClick={handleLoginClick}>
              Entrar
            </button>

          </div>
        </form>

        {erro && (
          <div className="toast-erro-personalizado">
            <div className="toast-barra-lateral"></div>
            <div className="toast-conteudo">
              <div className="text-toats">
                <span className="toast-texto">{erro}</span>
              </div>
            </div>
            <span className="toast-fechar" onClick={() => setErro(null)}>
              ×
            </span>
          </div>
        )}

        <Link to="/">
          <button className="botao-trocar">Alterar Acesso</button>
        </Link>
      </div>
    </div>
  );
}

export default LoginMorador;
