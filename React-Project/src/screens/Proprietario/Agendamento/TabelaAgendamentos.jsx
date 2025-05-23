// src/screens/Proprietario/Agendamento/TabelaAgendamentos.jsx
import React from 'react';

export default function TabelaAgendamentos({ dados, onEditar, onExcluir }) {
  return (
    <table className="tabela-agendamentos">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>ID</th>
          <th>Descrição</th>
          <th>Tipo agendamento</th>
          <th>Data inicio</th>
          <th>Data fim</th>
          <th>Status</th>
          <th>Observação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((agendamento) => (
          <tr key={agendamento.id}>
            <td><input type="checkbox" /></td>
            <td>{agendamento.id.toString().padStart(2, '0')}</td>
            <td>{agendamento.descricao}</td>
            <td>{agendamento.tipo}</td>
            <td>{agendamento.dataInicio}</td>
            <td>{agendamento.dataFim}</td>
            <td>{agendamento.status}</td>
            <td>{agendamento.observacao}</td>
            <td className="acoes">
              <button onClick={() => onEditar(agendamento)} title="Editar" className="btn-editar">
                &#9998;
              </button>
              <button onClick={() => onExcluir(agendamento.id)} title="Excluir" className="btn-excluir">
                &#128465;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
