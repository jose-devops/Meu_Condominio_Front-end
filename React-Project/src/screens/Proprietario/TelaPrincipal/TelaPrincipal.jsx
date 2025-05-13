import React from 'react';
import MenuLateral from '../../Components/MenuLateral/MenuLateral'; 
import LogoAndNotification from '../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification';
import './TelaPrincipal.css'; // Estilo da tela principal

const TelaPrincipal = () => {
  return (
    <div className="tela-principal">
      {/* Cabeçalho com Logo e Notificação */}
      <header className="header">
        <LogoAndNotification />
      </header>

      {/* Layout com Menu Lateral e Conteúdo */}
      <div className="content-container">
        <MenuLateral />
        <div className="main-content">
          <h1>Bem-vindo à Tela Principal</h1>
        </div>
      </div>
    </div>
  );
};

export default TelaPrincipal;
