import React from "react";
import './TabelaPrestadorMorador.css';

export default function TabelaPrestadorMorador({ prestadores, onEditar, onExcluir }) {
  return (
    <table className="morador-tabela-prestadores">
      <thead>
        <tr>
          <th>ID</th>
          <th>Razão</th>
          <th>CPF / CNPJ</th>
          <th>Data Nascimento</th>
          <th>Telefone Principal</th>
          <th>Telefone Secundário</th>
          <th>Profissão</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {prestadores.map((prestador) => (
          <tr key={prestador.id}>
            <td>{prestador.id}</td>
            <td>{prestador.razao}</td>
            <td>{prestador.cpfCnpj}</td>
            <td>{prestador.dataNascimento}</td>
            <td>{prestador.telefone1}</td>
            <td>{prestador.telefone2}</td>
            <td>{prestador.profissao}</td>
            <td>
              <button
                className="morador-btn-editar-prestador"
                onClick={() => onEditar(prestador)}
                title="Editar"
              >✏</button>
              <button
                className="morador-btn-excluir-prestador"
                onClick={() => onExcluir(prestador.id)}
                title="Excluir"
              >🗑</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
