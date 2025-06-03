import React from 'react';
import './TabelaAgendamento.css';

function formatarDataHora(dataISO) {
  if (!dataISO) return '';
  const data = new Date(dataISO);
  return data.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export default function TabelaAgendamentos({ dados, onEditar, onExcluir }) {
  return (
    <table className="tabela-agendamento">
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
            <td className="acoes">
              <button onClick={() => onEditar(agendamento)} title="Editar" className="btn-editar">
                &#9998;
              </button>

              <button 
                onClick={() => onExcluir(agendamento.id)} 
                title="Excluir" 
                className="btn-excluir"
              >
                &#128465; {/* Ícone lixeira */}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
