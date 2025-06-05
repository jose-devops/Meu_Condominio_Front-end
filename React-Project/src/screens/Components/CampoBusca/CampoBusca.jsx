import React from 'react';
import { FaSearch } from "react-icons/fa";
import './CampoBusca.css';

/**
 * Componente de campo de busca com ícone separado
 */
const CampoBusca = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar">
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
