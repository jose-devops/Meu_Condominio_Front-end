import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './LogoAndNotificationMorador.css';

const LogoAndNotificationMorador = () => {
  const [unread, setUnread] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="header-container-morador">
      <div className="notification-container-morador">
        <FaBell size={20} color={unread ? '#fff' : '#fff'} />
      </div>

      <div className="logo-container-morador" onClick={toggleModal}>
        <i className="fa-solid fa-user user-morador"></i>
      </div>

      {modalOpen && (
        <div className="modal-container-user-morador" onClick={() => setModalOpen(false)}>
          <div className="modal-user-morador" onClick={e => e.stopPropagation()}>
            <ul>
              <li><FaUserCircle /> Perfil</li>
              <li><FaCog /> Config</li>
              <hr className="divider-morador" />
              <li><FaSignOutAlt /> Sair</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoAndNotificationMorador;
