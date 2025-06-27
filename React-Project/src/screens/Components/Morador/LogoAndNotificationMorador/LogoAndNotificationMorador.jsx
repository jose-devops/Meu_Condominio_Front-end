import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './LogoAndNotificationMorador.css';

const LogoAndNotificationMorador = ({openModalPerfilMorador} ) => {
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

      <div className="logo-container-morador"  onClick={openModalPerfilMorador}>
        <i className="fa-solid fa-user user-morador"></i>
      </div>


    </div>
  );
};

export default LogoAndNotificationMorador;
