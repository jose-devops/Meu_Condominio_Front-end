import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './MenuLateralMorador.css';

import iconeHome        from '../../../IMG/ICON/tela-principal/icone-home.png';
import iconeAgendamento from '../../../IMG/ICON/tela-principal/icone-agendamento.png';
import iconeInquilino   from '../../../IMG/ICON/tela-principal/icone-inquilino.png';
import iconeContratos   from '../../../IMG/ICON/tela-principal/icone-contratos.png';
import iconePrestadores from '../../../IMG/ICON/tela-principal/icone-prestadores.png';
import iconeSair        from '../../../IMG/ICON/tela-principal/icone-sair.png';



export default function MenuLateralMorador({ isCollapsed, toggleSidebar, openModalContrato, closeModalContrato, openModalPerfilMorador }) {
  const [mostrarModalContrato, setMostrarModalContrato] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // para passar ao modal

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login-morador');
  };


  return (
    <div className={`sidebar-morador ${isCollapsed ? 'retracted-morador' : ''}`}>
      <div className="sidebar-toggle-morador">
        <button className="btn-morador" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars" id="sidebar-icon-morador" />
        </button>
      </div>

      <ul className="list-unstyled-morador flex-grow-1-morador">



        <li className="sidebar-item-morador">
          <a href="/tela-principal-morador" className="sidebar-link-morador">
            <div className="icon-container-morador">
              <img src={iconeHome} alt="Home" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Home</span>
          </a>
        </li>

        <li className="sidebar-item-morador">
          <a href="/agendamentos-morador" className="sidebar-link-morador" onClick={() => setMostrarModalContrato(true)}>
            <div className="icon-container-morador">
              <img src={iconeAgendamento} alt="Agendamento" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Agendamento</span>
          </a>
        </li>

        <li className="sidebar-item-morador">
          <a className="sidebar-link-morador" onClick={openModalPerfilMorador}>
            <div className="icon-container-morador">
              <img src={iconeInquilino} alt="Inquilino" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Morador</span>
          </a>
        </li>


        <li className="sidebar-item-morador">
          <a className="sidebar-link-morador" onClick={openModalContrato}>
            <div className="icon-container-morador">
              <img src={iconeContratos} alt="Contratos" width="30" height="30" />
            </div>
            <span className="sidebar-text-morador">Contratos</span>
          </a>
        </li>


        <li className="sidebar-item-morador">
          <a href="/prestadores-morador" className="sidebar-link-morador">
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

    </div>
  );
}
