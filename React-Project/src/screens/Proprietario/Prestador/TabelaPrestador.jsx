import React from "react";

export default function TabelaPrestador({ prestadores }) {
  return (
    <table className="tabela-prestadores">
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
              <button>✏</button>
              <button>🗑</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
