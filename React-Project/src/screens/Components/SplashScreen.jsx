import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';
import logo from '../IMG/logo/splash_logo.png';


export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
  
    const tipoAcesso = localStorage.getItem('tipoAcesso');  


    if (!tipoAcesso) {
  
      navigate('/');
    } else if (tipoAcesso === 'MORADOR') {
      setTimeout(() => {
        navigate('/tela-principal-morador');
      }, 2000);
    } else if (tipoAcesso === 'PROPRIETARIO') {
      setTimeout(() => {
        navigate('/tela-principal');
      }, 2000);
    }
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src={logo} alt="Logo" className="splash-logo" />
    </div>
  );
}
