import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalContratoMorador from "../ModalContrato/ModalContratoMorador";
import ModalPerfilMorador from "../ModalMorador/ModalPerfilMorador"; // seu modal de Inquilino
import "./MenuPrincipalMorador.css";

import iconeAgendamento from "../../../IMG/logo/tela-principal/icone-agendamento.png";
import iconeInquilino from "../../../IMG/logo/tela-principal/icone-inquilino.png";
import iconeContratos from "../../../IMG/logo/tela-principal/icone-contratos.png";
import iconePrestadores from "../../../IMG/logo/tela-principal/icone-prestadores.png";

const itensMenuMorador = [
  { id: 1, label: "Agendamento", icon: iconeAgendamento, rota: "/agendamentos-morador" },
  { id: 2, label: "Inquilino", icon: iconeInquilino },            // sem rota
  { id: 3, label: "Contratos", icon: iconeContratos },
  { id: 5, label: "Prestadores", icon: iconePrestadores, rota: "/prestadores-morador" },
];

export default function MenuPrincipalMorador() {
  const [ativo, setAtivo] = useState(null);
  const [mostrarModalContratos, setMostrarModalContratos] = useState(false);
  const [mostrarModalInquilino, setMostrarModalInquilino] = useState(false);
  const navigate = useNavigate();

  function handleClick(item) {
    setAtivo(item.id);

    if (item.label === "Contratos") {
      setMostrarModalContratos(true);
    } 
    else if (item.label === "Inquilino") {
      setMostrarModalInquilino(true);
    }
    else if (item.rota) {
      navigate(item.rota);
    }
  }

  return (
    <div className="navbar-wrapper-morador">
      <div className="navbar-background-morador" />

      <div className="navbar-morador">
        {itensMenuMorador.map(item => (
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

      {mostrarModalContratos && (
        <ModalContratoMorador onClose={() => setMostrarModalContratos(false)} />
      )}

      {mostrarModalInquilino && (
        <ModalPerfilMorador
          onClose={() => setMostrarModalInquilino(false)}
          onSalvar={() => setMostrarModalInquilino(false)}
        />
      )}
    </div>
  );
}
