import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './MenuLateralMorador.css';

import iconeHome from '../../../IMG/ICON/tela-principal/icone-home.png';
import iconeAgendamento from '../../../IMG/ICON/tela-principal/icone-agendamento.png';
import iconeInquilino from '../../../IMG/ICON/tela-principal/icone-inquilino.png';
import iconeContratos from '../../../IMG/ICON/tela-principal/icone-contratos.png';
import iconeImovel from '../../../IMG/ICON/tela-principal/icone-imovel.png';
import iconePrestadores from '../../../IMG/ICON/tela-principal/icone-prestadores.png';
import iconeSair from '../../../IMG/ICON/tela-principal/icone-sair.png';
import ModalContratoMorador from '../ModalContrato/ModalContratoMorador';

const MenuLateralMorador = ({ isCollapsed, toggleSidebar }) => {
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar a exibição do modal
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login-morador');
  };

  const handleClick = (rota) => {
    if (rota === '/contrato-morador') {
      setMostrarModal(true); // Exibe o modal ao clicar em "Contratos"
    } else {
      navigate(rota); // Navega normalmente para as outras páginas
    }
  };

  const fecharModal = () => {
    setMostrarModal(false); // Fecha o modal
  };

  return (
    <div className={`sidebar-morador ${isCollapsed ? 'retracted-morador' : ''}`}>

      <div className="sidebar-toggle-morador">
        <button id="toggle-btn-morador" className="btn-morador" onClick={toggleSidebar}>
          <span id="sidebar-icon-morador">
            <i className={`fa-solid ${isCollapsed ? 'fa-bars' : 'fa-bars'}`}></i>
          </span>
        </button>
      </div>

      <ul className="list-unstyled-morador flex-grow-1-morador">
        <li className="sidebar-item-morador">
          <a href="#" className="sidebar-link-morador" onClick={() => handleClick('/tela-principal-morador')}>
            <div className="icon-container-morador">
              <img src={iconeHome} alt="Home" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Home</span>
          </a>
        </li>
        <li className="sidebar-item-morador">
          <a href="#" className="sidebar-link-morador" onClick={() => handleClick('/agendamentos-morador')}>
            <div className="icon-container-morador">
              <img src={iconeAgendamento} alt="Agendamento" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Agendamento</span>
          </a>
        </li>
        <li className="sidebar-item-morador">
          <a href="#" className="sidebar-link-morador" onClick={() => handleClick('/morador')}>
            <div className="icon-container-morador">
              <img src={iconeInquilino} alt="Inquilino" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Inquilino</span>
          </a>
        </li>
        <li className="sidebar-item-morador">
          <a href="#" className="sidebar-link-morador" onClick={() => handleClick('/contrato-morador')}>
            <div className="icon-container-morador">
              <img src={iconeContratos} alt="Contratos" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Contratos</span>
          </a>
        </li>
        <li className="sidebar-item-morador">
          <a href="#" className="sidebar-link-morador" onClick={() => handleClick('/prestadores-morador')}>
            <div className="icon-container-morador">
              <img src={iconePrestadores} alt="Prestadores" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Prestadores</span>
          </a>
        </li>
      </ul>

      <ul>
        <li className="sidebar-item-morador">
          <button className="sidebar-link-morador" onClick={handleLogout}>
            <div className="icon-container-morador">
              <img src={iconeSair} alt="Sair" width="30" height="30" />
            </div>
            {!isCollapsed && <span className="sidebar-text-morador">Sair</span>}
          </button>
        </li>
      </ul>

      {/* Exibe o modal quando a variável mostrarModal for true */}
      {mostrarModal && <ModalContratoMorador onClose={fecharModal} />}
    </div>
  );
};

export default MenuLateralMorador;
