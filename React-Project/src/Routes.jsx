import React from 'react';
import PrivateRoute from './routes/PrivateRoute';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaTipoAcesso from './screens/TipoAcesso';
import LoginProprietario from './screens/Proprietario/Login/LoginProprietario';
import LoginMorador from './screens/Morador/Login/LoginMorador';
import RegistroProprietario from './screens/RegistroProprietario';
import TelaPrincipal from './screens/Proprietario/TelaPrincipal/TelaPrincipal'; // TelaPrincipal
import MenuLateral from './screens/Components/MenuLateral/MenuLateral'; // MenuLateral
import LogoAndNotification from './screens/Components/MenuLateral/Logo&Notificacao/LogoAndNotification';
import MenuPrincipal from './screens/Components/MenuLateral/MenuPrincipal/MenuPrincipal';
import TelaAgendamento from './screens/Proprietario/Agendamento/TelaAgendamento'; // <<< IMPORTAÇÃO NOVA
import TelaContratos from './screens/Proprietario/Contratos/TelaContratos'; // <<< Import correto


function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota sem menu lateral */}
        <Route path="/" element={<TelaTipoAcesso />} />
        <Route path="/login-proprietario" element={<LoginProprietario />} />
        <Route path="/login-morador" element={<LoginMorador />} />
feature/interface-PaginaPrincipalProprietario
        <Route path="/registro-proprietario" element={<RegistroProprietario />} />

         <Route path="/registro-proprietario" element={<RegistroProprietario />} />


        {/* Rota com Menu Lateral e Tela Principal */}
        <Route
          path="/tela-principal"
          element={
            <PrivateRoute>
            <div style={{ display: 'flex' }}>
              <TelaPrincipal />
            </div>
            </PrivateRoute>
          }
        />
        {/* ROTA NOVA DE AGENDAMENTOS */}
        <Route
          path="/agendamentos"
          element={
            <div style={{ display: 'flex' }}>
              <TelaAgendamento/>
            </div>
          }
        />
        <Route
          path="/contratos"
          element={
            <div style={{ display: 'flex' }}>
              <TelaContratos/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
