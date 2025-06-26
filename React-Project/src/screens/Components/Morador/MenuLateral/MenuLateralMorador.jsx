import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './MenuLateralMorador.css';

import iconeHome        from '../../../IMG/ICON/tela-principal/icone-home.png';
import iconeAgendamento from '../../../IMG/ICON/tela-principal/icone-agendamento.png';
import iconeInquilino   from '../../../IMG/ICON/tela-principal/icone-inquilino.png';
import iconeContratos   from '../../../IMG/ICON/tela-principal/icone-contratos.png';
import iconePrestadores from '../../../IMG/ICON/tela-principal/icone-prestadores.png';
import iconeSair        from '../../../IMG/ICON/tela-principal/icone-sair.png';

import ModalContratoMorador    from '../ModalContrato/ModalContratoMorador';
import ModalPerfilMorador      from '../ModalMorador/ModalPerfilMorador'; // <-- modal do Inquilino

export default function MenuLateralMorador({ isCollapsed, toggleSidebar }) {
  const [mostrarModalContrato, setMostrarModalContrato] = useState(false);
  const [mostrarModalInquilino, setMostrarModalInquilino] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // para passar ao modal

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login-morador');
  };

  function handleClick(rota) {
    switch (rota) {
      case '/contrato-morador':
        setMostrarModalContrato(true);
        break;
      case '/morador':               // rota que usava para “Inquilino”
        setMostrarModalInquilino(true);
        break;
      default:
        navigate(rota);
    }
  }

  return (
    <div className={`sidebar-morador ${isCollapsed ? 'retracted-morador' : ''}`}>
      <div className="sidebar-toggle-morador">
        <button className="btn-morador" onClick={toggleSidebar}>
          <i className="fa-solid fa-bars" id="sidebar-icon-morador" />
        </button>
      </div>

      <ul className="list-unstyled-morador flex-grow-1-morador">
        <li className="sidebar-item-morador">
          <button onClick={() => handleClick('/tela-principal-morador')} className="sidebar-link-morador">
            <img src={iconeHome} alt="Home" width="30" height="30" />
            <span className="sidebar-text-morador">Home</span>
          </button>
        </li>

        <li className="sidebar-item-morador">
          <button onClick={() => handleClick('/agendamentos-morador')} className="sidebar-link-morador">
            <img src={iconeAgendamento} alt="Agendamento" width="30" height="30" />
            <span className="sidebar-text-morador">Agendamento</span>
          </button>
        </li>

        <li className="sidebar-item-morador">
          <button onClick={() => handleClick('/morador')} className="sidebar-link-morador">
            <img src={iconeInquilino} alt="Inquilino" width="30" height="30" />
            <span className="sidebar-text-morador">Inquilino</span>
          </button>
        </li>

        <li className="sidebar-item-morador">
          <button onClick={() => handleClick('/contrato-morador')} className="sidebar-link-morador">
            <img src={iconeContratos} alt="Contratos" width="30" height="30" />
            <span className="sidebar-text-morador">Contratos</span>
          </button>
        </li>

        <li className="sidebar-item-morador">
          <button onClick={() => handleClick('/prestadores-morador')} className="sidebar-link-morador">
            <img src={iconePrestadores} alt="Prestadores" width="30" height="30" />
            <span className="sidebar-text-morador">Prestadores</span>
          </button>
        </li>
      </ul>

      <ul>
        <li className="sidebar-item-morador">
          <button className="sidebar-link-morador" onClick={handleLogout}>
            <img src={iconeSair} alt="Sair" width="30" height="30" />
            {!isCollapsed && <span className="sidebar-text-morador">Sair</span>}
          </button>
        </li>
      </ul>

      {/* Modais */}
      {mostrarModalContrato && (
        <ModalContratoMorador onClose={() => setMostrarModalContrato(false)} />
      )}

      {mostrarModalInquilino && (
        <ModalPerfilMorador
          token={token}
          onClose={() => setMostrarModalInquilino(false)}
          onSalvar={() => setMostrarModalInquilino(false)}
        />
      )}
    </div>
  );
}
