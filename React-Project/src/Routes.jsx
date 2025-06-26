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
import TelaInquilino from './screens/Proprietario/Inquilino/TelaInquilino';
import TelaAgendamentoMorador from './screens/Morador/TelaAgendamento/TelaAgendamentoMorador';
import TelaPrestadorMorador from './screens/Morador/TelaPrestador/TelaPrestadorMorador';
import ModalContratoMorador from './screens/Components/Morador/ModalContrato/ModalContratoMorador';

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
        <Route path="/agendamentos-morador" element={<TelaAgendamentoMorador />} />
        <Route path="/prestadores-morador" element={<TelaPrestadorMorador />} />
       


        {/*Rotas protegidas por tipo de acesso */}
        {ProprietarioRoutes}

      </Routes>
      
    </Router>
  );
}

export default AppRoutes;
