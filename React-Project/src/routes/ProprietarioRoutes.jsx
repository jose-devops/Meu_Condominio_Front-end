import React from 'react';
import { Route } from 'react-router-dom';
import RoleProtectedRoute from './RoleProtectedRoute';

import TelaPrincipal from '../screens/Proprietario/TelaPrincipal/TelaPrincipal';
import TelaAgendamento from '../screens/Proprietario/Agendamento/TelaAgendamento';
import TelaContratos from '../screens/Proprietario/Contratos/TelaContratos';
import SplashScreen from '../screens/Components/SplashScreen'; // ajuste o caminho se necessário

const routes = [

  <Route
    key="splash-screen"
    path="/SplashScreen"
    element={<SplashScreen />}
  />,
  <Route
    key="tela-principal"
    path="/tela-principal"
    element={
      <RoleProtectedRoute allowedRoles={['PROPRIETARIO']}>
        <div style={{ display: 'flex' }}>
          <TelaPrincipal />
        </div>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="agendamentos"
    path="/agendamentos"
    element={
      <RoleProtectedRoute allowedRoles={['PROPRIETARIO']}>
        <div style={{ display: 'flex' }}>
          <TelaAgendamento />
        </div>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="contratos"
    path="/contratos"
    element={
      <RoleProtectedRoute allowedRoles={['PROPRIETARIO']}>
        <div style={{ display: 'flex' }}>
          <TelaContratos />
        </div>
      </RoleProtectedRoute>
    }
  />
];

export default routes;
