import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';
import logo from '../IMG/logo/splash_logo.png';



export default function SplashScreen() {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/tela-principal');
    }, 2000); // 2 segundos de splash

    return () => clearTimeout(timer);
  }, [navigate]);


  return (
  <div class="splash-container">
     <img src={logo} alt="Logo" className="splash-logo" />
    
  </div>
  );
}