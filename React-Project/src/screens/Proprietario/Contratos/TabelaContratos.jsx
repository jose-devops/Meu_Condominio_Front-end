// src/screens/Proprietario/Contratos/TabelaContratos.jsx
import React from 'react';

export default function TabelaContratos({ dados, onEditar, onExcluir }) {
  return (
    <table className="tabela-contratos">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>ID</th>
          <th>Imóvel</th>
          <th>Inquilino</th>
          <th>Proprietario</th>
          <th>Data posse</th>
          <th>Data despejo</th>
          <th>Status</th>
          <th>Valor aluguel</th>
          <th>Valor multa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((contrato) => (
          <tr key={contrato.id}>
            <td><input type="checkbox" /></td>
            <td>{contrato.id.toString().padStart(2, '0')}</td>
            <td>{contrato.observacao || 'N/A'}</td> {/* Usado como "Imóvel" */}
            <td>{contrato.nomeMorador || 'N/A'}</td> {/* Usado como "Inquilino" */}
            <td>{contrato.nomeProprietario || 'N/A'}</td>
            <td>{contrato.dataInicioVigencia || 'N/A'}</td> {/* Usado como "Data posse" */}
            <td>{contrato.dataFimVigencia || 'N/A'}</td>     {/* Usado como "Data despejo" */}
            <td>{contrato.status}</td>
            <td>{contrato.valorAluguel}</td>
            <td>{contrato.valorMulta}</td>
            <td className="acoes">
              <button onClick={() => onEditar(contrato)} title="Editar" className="btn-editar">
                &#9998;
              </button>
              <button onClick={() => onExcluir(contrato.id)} title="Excluir" className="btn-excluir">
                &#128465;
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
