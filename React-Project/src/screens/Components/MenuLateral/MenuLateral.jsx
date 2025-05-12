import React, { useState } from 'react';
import './MenuLateral.css'; 

// Corrigindo as importações dos ícones diretamente
import iconeHome from '../../IMG/ICON/tela-principal/icone-home.png';
import iconeAgendamento from '../../IMG/ICON/tela-principal/icone-agendamento.png';
import iconeInquilino from '../../IMG/ICON/tela-principal/icone-inquilino.png';
import iconeContratos from '../../IMG/ICON/tela-principal/icone-contratos.png';
import iconeImovel from '../../IMG/ICON/tela-principal/icone-imovel.png';
import iconePrestadores from '../../IMG/ICON/tela-principal/icone-prestadores.png';
import iconeSair from '../../IMG/ICON/tela-principal/icone-sair.png';

const MenuLateral = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'retracted' : ''}`}>
      {/* Botão de alternância */}
      <div className="sidebar-toggle">
        <button id="toggle-btn" className="btn" onClick={toggleSidebar}>
          <span id="sidebar-icon">&#9776;</span>
        </button>
      </div>
      
      {/* Itens do Menu */}
      <ul className="list-unstyled flex-grow-1">
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeHome} alt="Home" width="30" height="30" />
            </div>
            <span className="sidebar-text">Home</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeAgendamento} alt="Agendamento" width="30" height="30" />
            </div>
            <span className="sidebar-text">Agendamento</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeInquilino} alt="Inquilino" width="30" height="30" />
            </div>
            <span className="sidebar-text">Inquilino</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeContratos} alt="Contratos" width="30" height="30" />
            </div>
            <span className="sidebar-text">Contratos</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeImovel} alt="Imóvel" width="30" height="30" />
            </div>
            <span className="sidebar-text">Imóvel</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconePrestadores} alt="Prestadores" width="30" height="30" />
            </div>
            <span className="sidebar-text">Prestadores</span>
          </a>
        </li>
      </ul>

      {/* Menu sair */}
      <ul>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeSair} alt="Sair" width="30" height="30" />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;
