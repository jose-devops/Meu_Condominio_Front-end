import React from "react";
import './TabelaPrestadorMorador.css';
import { AiOutlineEdit, AiOutlineEye, AiOutlineFile, AiOutlineInfo, AiOutlineOrderedList, } from 'react-icons/ai';


export default function TabelaPrestadorMorador({ prestadores, onEditar, onExcluir }) {
  return (
    <table className="tabela-prestador-morador">
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
        {prestadores.map((prestadorMorador) => (
          <tr key={prestadorMorador.id}>
             <td><input type="checkbox" /></td>
            <td>{prestadorMorador.id}</td>
            <td>{prestadorMorador.razao}</td>
            <td>{prestadorMorador.cpfCnpj}</td>
            <td>{prestadorMorador.telefonePrincipal}</td>
            <td>{prestadorMorador.telefoneSecundario}</td>
            <td>{prestadorMorador.especialidade}</td>
          
            <td className="acoes-prestador-morador">
              <button onClick={() => onEditar(prestadorMorador)} title="Editar" className="btn-editar-prestador-morador">
                <AiOutlineFile style={{strokeWidth: 100 }}/>
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
