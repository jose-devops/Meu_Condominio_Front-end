import React from 'react';
import './EstiloImovel.css';

export default function TabelaImoveis({ dados, onEditar, onExcluir }) {
  return (
    <div className="tabela-container">
      <table className="tabela-imoveis">
        <thead>
          <tr>
            <th>ID</th>
            <th>Proprietário</th>
            <th>Inquilino</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Bairro</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan="10" className="sem-dados">Nenhum imóvel cadastrado</td>
            </tr>
          ) : (
            dados.map(imovel => (
              <tr key={imovel.id}>
                <td>{imovel.id}</td>
                <td>{imovel.proprietario}</td>
                <td>{imovel.inquilino}</td>
                <td>{imovel.endereco}</td>
                <td>{imovel.cep}</td>
                <td>{imovel.cidade}</td>
                <td>{imovel.uf}</td>
                <td>{imovel.bairro}</td>
                <td>{imovel.situacao}</td>
                <td className="acoes">
                  <button onClick={() => onEditar(imovel)} title="Editar">✏️</button>
                  <button onClick={() => onExcluir(imovel.id)} title="Excluir">🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
