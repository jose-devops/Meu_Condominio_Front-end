import React from 'react';
import './BotaoNovo.css';

/**
 * Componente de botão reutilizável para ações de criação
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onClick - Função a ser executada ao clicar no botão
 * @param {string} props.texto - Texto a ser exibido no botão (padrão: "Novo")
 * @param {string} props.className - Classes adicionais para estilização
 */
const BotaoNovo = ({ onClick, texto = "NOVO", className = "" }) => {
  return (
    <button 
      className={`botao-novo-component ${className}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotaoNovo;
