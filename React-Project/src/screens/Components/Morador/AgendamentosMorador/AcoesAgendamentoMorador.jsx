// src/screens/Agendamento/AcoesAgendamentoMorador.jsx
import React from 'react';

export default function AcoesAgendamentoMorador({ agendamento, onEditar, onExcluir }) {
  return (
    <>
      <button onClick={onEditar} className="morador-btn-editar">Editar</button>
      <button
        onClick={() => {
          if (window.confirm(`Excluir agendamento "${agendamento.descricao}"?`)) {
            onExcluir();
          }
        }}
        className="morador-btn-excluir"
      >
        Excluir
      </button>
    </>
  );
}
