import React from 'react';
import './TabelaImoveis.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function TabelaImoveis({ dados, onEditar, onExcluir }) {
  return (
    
      <table className="tabela-imoveis">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>ID</th>
            <th>Descrição</th>
            <th>Proprietário</th>
            <th>Morador</th>
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
                <td><input type="checkbox" /></td>
                <td>{imovel.id}</td>
                <td>{imovel.descricao}</td>
                <td>{imovel.nomeProprietario}</td>
                <td>{imovel.nomeMorador}</td>
                <td>{imovel.endereco}</td>
                <td>{imovel.cep}</td>
                <td>{imovel.cidade}</td>
                <td>{imovel.uf}</td>
                <td>{imovel.bairro}</td>
                <td>{imovel.status}</td>
                <td className="acoes-imoveis">

                  <button onClick={() => onEditar(imovel)} title="Editar" className="btn-editar-imoveis">
                    <AiOutlineEdit style={{strokeWidth: 100 }}/>
                  </button>
                  <button onClick={() => onExcluir(imovel)} title="Excluir" className="btn-excluir-imoveis">
                    <AiOutlineDelete style={{ strokeWidth: 80 }}/>
                  </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

  );
}
