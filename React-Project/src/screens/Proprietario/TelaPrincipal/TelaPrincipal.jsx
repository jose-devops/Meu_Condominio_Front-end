import React from 'react';
import MenuLateral from '../../Components/MenuLateral/MenuLateral'; 

const TelaPrincipal = () => {
  return (
    <div>
      <MenuLateral />
      <div className="main-content">
        <h1>Bem-vindo à Tela Principal</h1>
      </div>
    </div>
  );
};

export default TelaPrincipal;
