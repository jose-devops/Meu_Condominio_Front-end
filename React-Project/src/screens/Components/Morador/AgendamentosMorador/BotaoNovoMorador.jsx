import React from 'react';
import './BotaoNovoMorador.css';

/**
 * Botão reutilizável para ações de criação (perfil morador)
 * @param {Object} props
 * @param {Function} props.onClick - Função ao clicar
 * @param {string} props.texto - Texto do botão (padrão: "NOVO")
 * @param {string} props.className - Classes extras
 */
const BotaoNovoMorador = ({ onClick, texto = "NOVO", className = "" }) => {
  return (
    <button 
      className={`morador-botao-novo-component ${className}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotaoNovoMorador;
