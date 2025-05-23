// src/screens/Agendamento/FiltroBusca.jsx
import React from 'react';

export default function FiltroBusca({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Faça sua busca..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="input-busca"
    />
  );
}
