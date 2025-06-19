import React from 'react';
import './TabelaAgendamentoMorador.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

function formatarDataHora(dataISO) {
  if (!dataISO) return '';
  const data = new Date(dataISO);
  return data.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export default function TabelaAgendamentosMorador({ dados, onEditar, onExcluir }) {
  return (
    <table className="morador-tabela-agendamento">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>ID</th>
          <th>Descrição</th>
          <th>Tipo agendamento</th>
          <th>Data início</th>
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
            <td>{agendamento.tipoAgendamento}</td>
            <td>{formatarDataHora(agendamento.dataInicio)}</td>
            <td>{formatarDataHora(agendamento.dataFim)}</td>
            <td>{agendamento.status}</td>
            <td>{agendamento.observacao || '-'}</td>
            <td className="morador-acoes-agendamento">
              <button onClick={() => onEditar(agendamento)} title="Editar" className="morador-btn-editar-agendamento">
                <AiOutlineEdit style={{ strokeWidth: 100 }} />
              </button>
              <button onClick={() => onExcluir(agendamento.id)} title="Excluir" className="morador-btn-excluir-agendamento">
                <AiOutlineDelete style={{ strokeWidth: 80 }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
