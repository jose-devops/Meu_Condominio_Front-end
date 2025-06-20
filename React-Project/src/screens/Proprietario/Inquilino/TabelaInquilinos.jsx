import './TabelaInquilinos.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import React from 'react';

export default function TabelaInquilinos({ dados, onEditar, onExcluir }) {
  return (
    <table className="tabela-inquilinos">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data aniversário</th>
          <th>Telefone principal</th>
          <th>Telefone secundário</th>
          <th>Profissão</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((inquilino) => (
          <tr key={inquilino.id}>
            <td><input type="checkbox" /></td>
            <td>{inquilino.id.toString().padStart(2, '0')}</td>
            <td>{inquilino.nome || 'N/A'}</td>
            <td>{inquilino.cpf || 'N/A'}</td>
            <td>{inquilino.dataAniversario || 'N/A'}</td>
            <td>{inquilino.telefonePrincipal || 'N/A'}</td>
            <td>{inquilino.telefoneSecundario || 'N/A'}</td>
            <td>{inquilino.profissao || 'N/A'}</td>
            <td className="acoes-inquilinos">
              <button onClick={() => onEditar(inquilino)} title="Editar" className="btn-editar-inquilinos">
                <AiOutlineEdit style={{strokeWidth: 100 }}/>
              </button>
              <button onClick={() => onExcluir(inquilino)} title="Excluir" className="btn-excluir-inquilinos">
                <AiOutlineDelete style={{ strokeWidth: 80 }}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

