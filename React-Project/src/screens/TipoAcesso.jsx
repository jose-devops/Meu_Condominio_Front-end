import React from 'react';
import './TipoAcesso.css';
import { Link } from 'react-router-dom';
import logo from './IMG/logo/logo_principal.png';
import iconeInquilino from './IMG/ICON/icone-chave.png';
import iconeProprietario from './IMG/ICON/icone-casa.png';

function TelaTipoAcesso() {
  return (
    <div className="container-tipo-acesso">
      <div className="coluna-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div className="coluna-conteudo">
        <div>
          <h3 className="tipo_de_acesso">Como você deseja acessar?</h3>
        </div>

        <div className="botoes-acesso col-6">
          <div className="card-botao">
            <img src={iconeInquilino} alt="Inquilino" className="icone-acesso" />
            <Link to="/login-morador">
              <button className="botao_acesso">MORADOR</button>
            </Link>
          </div>
          <div className="card-botao">
            <img src={iconeProprietario} alt="Proprietário" className="icone-acesso" />
            <Link to="/login-proprietario">
              <button className="botao_acesso">PROPRIETÁRIO</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaTipoAcesso;
