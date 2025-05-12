import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaTipoAcesso from './screens/TipoAcesso';
import LoginProprietario from './screens/Proprietario/Login/LoginProprietario';
import LoginMorador from './screens/Morador/Login/LoginMorador';
import RegistroProprietario from './screens/RegistroProprietario';
import TelaPrincipal from './screens/Proprietario/TelaPrincipal/TelaPrincipal'; // TelaPrincipal
import MenuLateral from './screens/Components/MenuLateral/MenuLateral'; // MenuLateral

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota sem menu lateral */}
        <Route path="/" element={<TelaTipoAcesso />} />
        <Route path="/login-proprietario" element={<LoginProprietario />} />
        <Route path="/login-morador" element={<LoginMorador />} />
        <Route path="/registro-proprietario" element={<RegistroProprietario />} />

        {/* Rota com Menu Lateral e Tela Principal */}
        <Route
          path="/tela-principal"
          element={
            <div style={{ display: 'flex' }}>
              <MenuLateral />
              <TelaPrincipal />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
