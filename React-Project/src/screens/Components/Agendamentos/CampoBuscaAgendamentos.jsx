import React from 'react';
import { FaSearch } from "react-icons/fa";
import './CampoBuscaAgendamentos.css';


const CampoBuscaAgendamentos = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar-agendamentos">
       <FaSearch className="search-icon" />
      <input
    
        type="text-agendamento"
        className="form-control-agendamento"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CampoBuscaAgendamentos;
