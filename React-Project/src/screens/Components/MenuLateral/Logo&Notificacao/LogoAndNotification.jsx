import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // Usando react-icons para o ícone de notificação
import logo from '../../../IMG/ICON/foto-perfil.png'; // Caminho para o logo
import './LogoAndNotification.css'; // Importando o arquivo de estilo

const LogoAndNotification = () => {
  const [unread, setUnread] = useState(true); // Definindo se a notificação é não lida

  return (
    <div className="header-container">
      {/* Ícone de Notificação à esquerda */}
      <div className="notification-container">
        <FaBell size={24} color={unread ? '326978' : 'black'} />
      
      </div>

      {/* Logo à direita */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default LogoAndNotification;
