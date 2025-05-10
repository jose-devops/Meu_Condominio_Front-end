import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaTipoAcesso from './screens/TipoAcesso';


function AppRoutes() {
  return (
    <Router>
        <Routes>
        {/* Rota sem menu lateral */}
        <Route path="/" element={<TelaTipoAcesso />} />

      </Routes>

    </Router>
  );
}

export default AppRoutes;


