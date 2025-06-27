import React from 'react';
import { Route } from 'react-router-dom';
import RoleProtectedRoute from './RoleProtectedRoute';
import TelaPrincipalMorador from '../screens/Morador/TelaPrincipal/TelaPrincipalMorador';
import TelaAgendamentoMorador from '../screens/Morador/TelaAgendamento/TelaAgendamentoMorador';
import SplashScreen from '../screens/Components/SplashScreen';

const routes = [

  <Route
    key="splash-screen"
    path="/SplashScreen"
    element={<SplashScreen />}
  />,
  <Route
    key="tela-principal-morador"
    path="/tela-principal-morador"
    element={
      <RoleProtectedRoute allowedRoles={['MORADOR']}>
        <div style={{ display: 'flex' }}>
          <TelaPrincipalMorador />
        </div>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="agendamentos-morador"
    path="/agendamentos-morador"
    element={
      <RoleProtectedRoute allowedRoles={['MORADOR']}>
        <div style={{ display: 'flex' }}>
          <TelaAgendamentoMorador />
        </div>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="contratos"
    path="/contratos"
    element={
      <RoleProtectedRoute allowedRoles={['MORADOR']}>
        <div style={{ display: 'flex' }}>
          <TelaContratos />
        </div>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="inquilino"
    path="/inquilino"
    element={
      <RoleProtectedRoute allowedRoles={['MORADOR']}>
        <div style={{ display: 'flex' }}>
          <TelaInquilino />
        </div>
      </RoleProtectedRoute>
    }
  />,
  <Route
    key="prestadores"
    path="/prestadores"
    element={
      <RoleProtectedRoute allowedRoles={['MORADOR']}>
        <div style={{ display: 'flex' }}>
          <TelaPrestador />
        </div>
      </RoleProtectedRoute>
    }
  />

];

export default routes;
