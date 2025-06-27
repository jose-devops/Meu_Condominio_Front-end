import React, { useState } from 'react';
import MenuLateralMorador from '../../Components/Morador/MenuLateral/MenuLateralMorador';
import LogoAndNotificationMorador from '../../Components/Morador/LogoAndNotificationMorador/LogoAndNotificationMorador';
import MenuPrincipalMorador from '../../Components/Morador/MenuPrincipal/MenuPrincipalMorador';
import './TelaPrincipalMorador.css';

import ModalContratoMorador from '../../Components/Morador/ModalContrato/ModalContratoMorador';

import ModalPerfilMorador from '../../Components/Morador/ModalMorador/ModalPerfilMorador';

const TelaPrincipalMorador = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showModalContrato, setShowModalContrato] = useState(false); // Estado para controlar a exibição do modal
const [showModalPerfilMorador, setShowModalPerfilMorador] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);



const openModalPerfilMorador = () => {
  setShowModalPerfilMorador(true);
};

const closeModalPerfilMorador = () => {
  setShowModalPerfilMorador(false);
};



  const openModalContrato = () => {
    setShowModalContrato(true);
  };

  const closeModalContrato = () => {
    setShowModalContrato(false);
  };


  return (
    <div className="tela-principal-morador">
      <header className={`header-principal-morador ${isCollapsed ? 'no-sidebar-morador' : 'with-sidebar-morador'}`}>
        <div className='header-principal-morador-area'>
          <div className='title-header-principal-morador'>
            <div className='title-principal-morador'>
              <h1>Olá, Morador</h1>
              <h2>Seja bem vindo!</h2>
            </div>
            <div className='Notification-User-morador' onClick={openModalPerfilMorador}>
              <LogoAndNotificationMorador />
            </div>
          </div>
        </div>
      </header>

      <div className="content-container-morador">
        <MenuLateralMorador isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} openModalContrato={openModalContrato}   openModalPerfilMorador={openModalPerfilMorador}  />
        <div className={`main-content-morador ${isCollapsed ? 'no-sidebar-morador' : 'with-sidebar-morador'}`}>
        <MenuPrincipalMorador />



          
        {/* Modal de contrato */}
        {showModalContrato && <ModalContratoMorador onClose={closeModalContrato} />}
        {showModalPerfilMorador && <ModalPerfilMorador onClose={closeModalPerfilMorador} />}

        </div>
      </div>
    </div>
  );
};

export default TelaPrincipalMorador;
