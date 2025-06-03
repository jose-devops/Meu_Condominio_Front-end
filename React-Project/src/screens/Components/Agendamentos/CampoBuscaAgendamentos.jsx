import React from 'react';
import { FaSearch } from "react-icons/fa";
import './CampoBuscaAgendamentos.css';


const CampoBuscaAgendamentos = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar-agendamentos">
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

export default CampoBuscaAgendamentos;
