import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaTipoAcesso from './screens/TipoAcesso';
import LoginProprietario from './screens/Proprietario/Login/LoginProprietario';


function AppRoutes() {
  return (
    <Router>
        <Routes>
        {/* Rota sem menu lateral */}
        <Route path="/" element={<TelaTipoAcesso />} />
         <Route path="/login-proprietario" element={<LoginProprietario />} />

      </Routes>

    </Router>
  );
}

export default AppRoutes;


