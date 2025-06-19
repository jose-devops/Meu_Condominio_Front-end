// src/screens/Agendamento/FiltroBuscaMorador.jsx
import React from 'react';

export default function FiltroBuscaMorador({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Faça sua busca..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="morador-input-busca"
    />
  );
}
