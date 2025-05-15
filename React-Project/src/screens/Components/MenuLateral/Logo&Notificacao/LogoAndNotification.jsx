import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../../IMG/ICON/foto-perfil.png';
import './LogoAndNotification.css';

const LogoAndNotification = () => {
  const [unread, setUnread] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="header-container">
      <div className="notification-container">
        <FaBell size={24} color={unread ? '#326978' : 'black'} />
      </div>

      <div className="logo-container" onClick={toggleModal}>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {modalOpen && (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <ul>
              <li><FaUserCircle /> Perfil</li>
              <li><FaCog /> Config</li>
              <hr className="divider" />
              <li><FaSignOutAlt /> Sair</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAndNotification;
