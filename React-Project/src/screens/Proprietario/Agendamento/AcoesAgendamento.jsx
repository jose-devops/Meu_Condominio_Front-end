// src/screens/Agendamento/AcoesAgendamento.jsx
import React from 'react';

export default function AcoesAgendamento({ agendamento, onEditar, onExcluir }) {
  return (
    <>
      <button onClick={onEditar} className="btn-editar">Editar</button>
      <button
        onClick={() => {
          if (window.confirm(`Excluir agendamento "${agendamento.descricao}"?`)) {
            onExcluir();
          }
        }}
        className="btn-excluir"
      >
        Excluir
      </button>
    </>
  );
}
