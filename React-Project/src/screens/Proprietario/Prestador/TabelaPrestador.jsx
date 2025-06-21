import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import './TabelaPrestador.css';

export default function TabelaPrestador({ prestadores, onEditar,onExcluir }) {
  return (
    <table className="tabela-prestador">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF / CNPJ</th>
          <th>Telefone Principal</th>
          <th>Telefone Secundário</th>
          <th>Especialidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {prestadores.map((prestador) => (
          <tr key={prestador.id}>
            <td><input type="checkbox" /></td>
            <td>{prestador.id}</td>
            <td>{prestador.razao}</td>
            <td>{prestador.cpfCnpj}</td>
            <td>{prestador.telefonePrincipal}</td>
            <td>{prestador.telefoneSecundario}</td>
            <td>{prestador.especialidade}</td>
            <td className="acoes-prestador">
              <button onClick={() => onEditar(prestador)} title="Editar" className="btn-editar-prestador">
                <AiOutlineEdit style={{strokeWidth: 100 }}/>
              </button>
              <button onClick={() => onExcluir(prestador)} title="Excluir" className="btn-excluir-prestador">
                <AiOutlineDelete style={{ strokeWidth: 80 }}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
