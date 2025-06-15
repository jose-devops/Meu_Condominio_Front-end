import React from 'react';
import { FaSearch } from "react-icons/fa";
import './CampoBuscaContratos.css';


const CampoBuscaContratos = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar-contratos">
       <FaSearch className="search-icon" />
      <input
    
        type="text-contratos"
        className="form-control-contratos"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CampoBuscaContratos;
