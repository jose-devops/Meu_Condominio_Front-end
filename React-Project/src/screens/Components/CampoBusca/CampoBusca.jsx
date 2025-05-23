import React from 'react';
import { FaSearch } from "react-icons/fa";
import './estilos.css';

/**
 * Componente de campo de busca com ícone separado
 */
const CampoBusca = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar">
      <FaSearch className="icone-pesquisa" size={40} />
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CampoBusca;
