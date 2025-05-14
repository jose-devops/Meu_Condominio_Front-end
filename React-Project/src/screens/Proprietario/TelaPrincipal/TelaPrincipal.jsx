import React from 'react';
import MenuLateral from '../../Components/MenuLateral/MenuLateral'; 
import LogoAndNotification from '../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification';
import MenuPrincipal from '../../Components/MenuLateral/MenuPrincipal/MenuPrincipal';// import novo
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
          <MenuPrincipal />
        </div>
      </div>
    </div>
  );
};

export default TelaPrincipal;
