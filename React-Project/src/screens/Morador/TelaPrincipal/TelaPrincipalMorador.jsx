import React, { useState } from 'react';
import MenuLateralMorador from '../../Components/Morador/MenuLateral/MenuLateralMorador';
import LogoAndNotificationMorador from '../../Components/Morador/LogoAndNotificationMorador/LogoAndNotificationMorador';
import MenuPrincipalMorador from '../../Components/Morador/MenuPrincipal/MenuPrincipalMorador';
import './TelaPrincipalMorador.css';

const TelaPrincipalMorador = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="tela-principal-morador">
      <header className={`header-principal-morador ${isCollapsed ? 'no-sidebar-morador' : 'with-sidebar-morador'}`}>
        <div className='header-principal-morador-area'>
          <div className='title-header-principal-morador'>
            <div className='title-principal-morador'>
              <h1>Olá, Morador</h1>
              <h2>Seja bem vindo!</h2>
            </div>
            <div className='Notification-User-morador'>
              <LogoAndNotificationMorador />
            </div>
          </div>
        </div>
      </header>

      <div className="content-container-morador">
        <MenuLateralMorador isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <div className={`main-content-morador ${isCollapsed ? 'no-sidebar-morador' : 'with-sidebar-morador'}`}>
          <MenuPrincipalMorador />
        </div>
      </div>
    </div>
  );
};

export default TelaPrincipalMorador;
