import React from 'react';
import PrivateRoute from './routes/PrivateRoute';
import ProprietarioRoutes from './routes/ProprietarioRoutes';
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
import TelaImovel from './screens/Proprietario/Imovel/TelaImovel';
import TelaPrestador from './screens/Proprietario/Prestador/TelaPrestador';
import TelaPrincipalMorador from './screens/Morador/TelaPrincipal/TelaPrincipalMorador';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota sem menu lateral */}
        

        <Route path="/" element={<TelaTipoAcesso />} />
        <Route path="/login-proprietario" element={<LoginProprietario />} />
        <Route path="/login-morador" element={<LoginMorador />} />
        <Route path="/registro-proprietario" element={<RegistroProprietario />} />

        <Route path="/tela-principal-morador" element={<TelaPrincipalMorador />} />



        {/*Rotas protegidas por tipo de acesso */}
        {ProprietarioRoutes}
       


        {/*APAGAR DEPOIS QUE TIVER TODAS AS TELAS E MANTER AS ROTAS PROTEGITAS POR TIPO */}
        {/* TODO: Cole aqui as rotas antigas enquanto finalizam as migrações */}

        <Route
          path="/imovel"
          element={
            <div style={{ display: 'flex' }}>
              <TelaImovel/>
            </div>
          }
        />
        <Route
          path="/prestadores"
          element={
            <div style={{ display: 'flex' }}>
              <TelaPrestador/>
            </div>
          }
        />
      </Routes>
      
    </Router>
  );
}

export default AppRoutes;
