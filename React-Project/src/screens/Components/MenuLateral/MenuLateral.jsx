import React from 'react';
import { useNavigate } from 'react-router-dom'; // Adicionado para navegação

import './MenuLateral.css'; 

import iconeHome from '../../IMG/ICON/tela-principal/icone-home.png';
import iconeAgendamento from '../../IMG/ICON/tela-principal/icone-agendamento.png';
import iconeInquilino from '../../IMG/ICON/tela-principal/icone-inquilino.png';
import iconeContratos from '../../IMG/ICON/tela-principal/icone-contratos.png';
import iconeImovel from '../../IMG/ICON/tela-principal/icone-imovel.png';
import iconePrestadores from '../../IMG/ICON/tela-principal/icone-prestadores.png';
import iconeSair from '../../IMG/ICON/tela-principal/icone-sair.png';

const MenuLateral = ({ isCollapsed, toggleSidebar }) => {

    const navigate = useNavigate();

  // Função para logout
  const handleLogout = () => {
    // 1. Remove o token/localStorage (ajuste conforme sua aplicação)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 2. Redireciona para a tela de login
    navigate('/login-proprietario');
  };

  // Itens do menu (para evitar repetição)
  const menuItems = [
    { icon: iconeHome, label: 'Home', path: '/' },
    { icon: iconeAgendamento, label: 'Agendamento', path: '/agendamentos' },
    { icon: iconeInquilino, label: 'Inquilino', path: '/inquilino' },
    { icon: iconeContratos, label: 'Contratos', path: '/contratos' },
    { icon: iconeImovel, label: 'Imóvel', path: '/imovel' },
    { icon: iconePrestadores, label: 'Prestadores', path: '/prestadores' },
  ];



  return (
    <div className={`sidebar ${isCollapsed ? 'retracted' : ''}`}>


      {/* Botão de alternância */}
      <div className="sidebar-toggle">
        <button id="toggle-btn" className="btn" onClick={toggleSidebar}>
          <span id="sidebar-icon">
            <i className={`fa-solid ${isCollapsed ? 'fa-solid fa-bars' : 'fa-solid fa-bars'}`}></i>

          </span>
        </button>
      </div>
      
      {/* Itens do Menu */}
      <ul className="list-unstyled flex-grow-1">
        <li className="sidebar-item">
          <a href="/tela-principal" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeHome} alt="Home" width="30" height="30" />
            </div>
            <span className="sidebar-text">Home</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/agendamentos" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeAgendamento} alt="Agendamento" width="30" height="30" />
            </div>
            <span className="sidebar-text">Agendamento</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/morador" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeInquilino} alt="Inquilino" width="30" height="30" />
            </div>
            <span className="sidebar-text">Inquilino</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/contratos" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeContratos} alt="Contratos" width="30" height="30" />
            </div>
            <span className="sidebar-text">Contratos</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/imovel" className="sidebar-link">
            <div className="icon-container">
              <img src={iconeImovel} alt="Imóvel" width="30" height="30" />
            </div>
            <span className="sidebar-text">Imóvel</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/prestadores" className="sidebar-link">
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
          <button className="sidebar-link" onClick={handleLogout}>
            <div className="icon-container">
              <img src={iconeSair} alt="Sair" width="30" height="30" />
            </div>
            {!isCollapsed && <span className="sidebar-text">Sair</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;
