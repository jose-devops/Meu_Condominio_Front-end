import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // import useNavigate

import "./MenuPrincipal.css";

import iconeAgendamento from "../../../IMG/logo/tela-principal/icone-agendamento.png";
import iconeInquilino from "../../../IMG/logo/tela-principal/icone-inquilino.png";
import iconeContratos from "../../../IMG/logo/tela-principal/icone-contratos.png";
import iconeImovel from "../../../IMG/logo/tela-principal/icone-imovel.png";
import iconePrestadores from "../../../IMG/logo/tela-principal/icone-prestadores.png";


const itensMenu = [
  { id: 1, label: "Agendamento", icon: iconeAgendamento, rota: "/agendamentos" },
  { id: 2, label: "Inquilino", icon: iconeInquilino, rota: "/inquilino" },
  { id: 3, label: "Contratos", icon: iconeContratos, rota: "/contratos" },
  { id: 4, label: "Imóvel", icon: iconeImovel, rota: "/imovel" },
  { id: 5, label: "Prestadores", icon: iconePrestadores, rota: "/prestadores" },
];

export default function MenuPrincipal() {
  const [ativo, setAtivo] = useState(null);
  const navigate = useNavigate();

  function handleClick(item) {
    setAtivo(item.id);
    if (item.rota) {
      navigate(item.rota);
    }
  }

  return (
    <div className="navbar-wrapper">
      <div className="navbar-background"></div>

      <div className="navbar">
        {itensMenu.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${ativo === item.id ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            <div className="icon-container">
              <img src={item.icon} alt={item.label} />
            </div>
            <span className="sidebar-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
