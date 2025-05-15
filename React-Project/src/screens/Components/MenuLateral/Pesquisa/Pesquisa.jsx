import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Importa o ícone de lupa
import './Pesquisa.css'; // Importa o CSS

export default function Pesquisa() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="top-bar d-flex justify-content-between p-3">
      {/* Barra de Pesquisa */}
      <div className="search-bar">
        <FaSearch className="icone-pesquisa" size={40} /> {/* Ícone de lupa */}
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
