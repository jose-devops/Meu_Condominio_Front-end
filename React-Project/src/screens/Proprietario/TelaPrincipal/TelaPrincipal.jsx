import React, { useState } from 'react';
import MenuLateral from '../../Components/MenuLateral/MenuLateral'; 
import LogoAndNotification from '../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification';
import MenuPrincipal from '../../Components/MenuLateral/MenuPrincipal/MenuPrincipal';
import Pesquisa from '../../Components/MenuLateral/Pesquisa/Pesquisa';
import './TelaPrincipal.css';

const TelaPrincipal = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);


  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    
    <div className="tela-principal">
      {/* Cabeçalho com Logo e Notificação */}
      <header className="header">
        <LogoAndNotification />
      </header>

      {/* Layout com Menu Lateral e Conteúdo */}
      <div className="content-container">
        <MenuLateral isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        <div className={`main-content ${isCollapsed ? 'no-sidebar' : 'with-sidebar'}`}>
          <Pesquisa />
          <MenuPrincipal />
        </div>
      </div>
    </div>
  );
};

export default TelaPrincipal;
