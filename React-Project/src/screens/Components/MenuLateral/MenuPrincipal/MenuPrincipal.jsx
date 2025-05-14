import React, { useState } from "react";
import "./MenuPrincipal.css";

import iconeAgendamento from "../../../IMG/logo/tela-principal/icone-agendamento.png";
import iconeInquilino from "../../../IMG/logo/tela-principal/icone-inquilino.png";
import iconeContratos from "../../../IMG/logo/tela-principal/icone-contratos.png";
import iconeImovel from "../../../IMG/logo/tela-principal/icone-imovel.png";
import iconePrestadores from "../../../IMG/logo/tela-principal/icone-prestadores.png";

const itensMenu = [
  { id: 1, label: "Agendamento", icon: iconeAgendamento },
  { id: 2, label: "Inquilino", icon: iconeInquilino },
  { id: 3, label: "Contratos", icon: iconeContratos },
  { id: 4, label: "Imóvel", icon: iconeImovel },
  { id: 5, label: "Prestadores", icon: iconePrestadores },
];

export default function MenuPrincipal() {
  const [ativo, setAtivo] = useState(null);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-background"></div>

      <div className="navbar">
        {itensMenu.map(({ id, label, icon }) => (
          <div
            key={id}
            className={`nav-item ${ativo === id ? "active" : ""}`}
            onClick={() => setAtivo(id)}
          >
            <div className="icon-container">
              <img src={icon} alt={label} />
            </div>
            <span className="sidebar-text">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
