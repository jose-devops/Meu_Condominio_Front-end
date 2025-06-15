import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MenuPrincipalMorador.css";

import iconeAgendamento from "../../../IMG/logo/tela-principal/icone-agendamento.png";
import iconeInquilino from "../../../IMG/logo/tela-principal/icone-inquilino.png";
import iconeContratos from "../../../IMG/logo/tela-principal/icone-contratos.png";
import iconeImovel from "../../../IMG/logo/tela-principal/icone-imovel.png";
import iconePrestadores from "../../../IMG/logo/tela-principal/icone-prestadores.png";

const itensMenuMorador = [
  { id: 1, label: "Agendamento", icon: iconeAgendamento, rota: "/agendamentos" },
  { id: 2, label: "Inquilino", icon: iconeInquilino, rota: "/inquilino" },
  { id: 3, label: "Contratos", icon: iconeContratos, rota: "/contratos" },
  { id: 5, label: "Prestadores", icon: iconePrestadores, rota: "/prestadores" },
];

export default function MenuPrincipalMorador() {
  const [ativo, setAtivo] = useState(null);
  const navigate = useNavigate();

  function handleClick(item) {
    setAtivo(item.id);
    if (item.rota) {
      navigate(item.rota);
    }
  }

  return (
    <div className="navbar-wrapper-morador">
      <div className="navbar-background-morador"></div>

      <div className="navbar-morador">
        {itensMenuMorador.map((item) => (
          <div
            key={item.id}
            className={`nav-item-morador ${ativo === item.id ? "active-morador" : ""}`}
            onClick={() => handleClick(item)}
          >
            <div className="icon-container-morador">
              <img src={item.icon} alt={item.label} />
            </div>
            <span className="sidebar-text-morador">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
