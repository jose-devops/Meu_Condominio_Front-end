import React from 'react';

// Estilos podem ser importados de EstiloInquilino.css ou um CSS específico para a tabela

export default function TabelaInquilino({ inquilinoes, onEditar, onExcluir }) {

  // Função para lidar com a mudança do checkbox (exemplo, pode precisar de lógica adicional)
  const handleCheckboxChange = (id) => {
    console.log(`Checkbox para inquilino ${id} clicado.`);
    // Adicionar lógica para selecionar/desselcionar inquilino se necessário
  };

  // Função para lidar com a mudança do checkbox principal (exemplo)
  const handleSelectAllChange = (event) => {
    console.log(`Selecionar todos: ${event.target.checked}`);
    // Adicionar lógica para selecionar/desselcionar todos os inquilinoes visíveis
  };

  return (
    <div className="tabela-inquilinoes-wrapper"> {/* Wrapper para rolagem horizontal se necessário */}
      <table className="tabela-inquilinoes"> {/* Classe específica para a tabela de inquilinoes */}
        <thead>
          <tr>
            {/* Coluna de Checkbox - Adicionada conforme 3.png */}
            <th style={{ width: '40px', textAlign: 'center' }}>
              <input 
                type="checkbox" 
                aria-label="Selecionar todos" 
                onChange={handleSelectAllChange} 
              />
            </th>
            {/* Cabeçalhos ajustados conforme imagem 3.png */}
            <th style={{ width: '60px' }}>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data aniversário</th>
            <th>Telefone principal</th>
            <th>Telefone secundário</th>
            <th>Profissão</th>
            <th style={{ width: '100px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {inquilinoes.length === 0 ? (
            <tr>
              {/* Ajustar colSpan para 9 devido à adição do checkbox */}
              <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                Nenhum inquilino encontrado.
              </td>
            </tr>
          ) : (
            inquilinoes.map((inquilino) => (
              <tr key={inquilino.id}>
                {/* Célula do Checkbox - Adicionada */}
                <td style={{ textAlign: 'center' }}>
                  <input 
                    type="checkbox" 
                    aria-label={`Selecionar inquilino ${inquilino.nome}`}
                    onChange={() => handleCheckboxChange(inquilino.id)}
                    // checked={/* Lógica para verificar se está selecionado */} 
                  />
                </td>
                {/* Dados do inquilino - Ajustar para corresponder aos cabeçalhos */}
                <td>{inquilino.id}</td>
                <td>{inquilino.nome}</td>
                <td>{inquilino.cpf}</td>
                {/* Assumindo que dataNascimento está no formato correto ou será formatado */}
                <td>{inquilino.dataNascimento}</td> 
                {/* Assumindo que telefone1 e telefone2 existem nos dados */}
                <td>{inquilino.telefone1 || '-'}</td> 
                <td>{inquilino.telefone2 || '-'}</td> 
                <td>{inquilino.profissao}</td>
                {/* Botões de Ação */}
                <td className="acoes">
                  <button className="btn-acao btn-editar" onClick={() => onEditar(inquilino)} title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V12h2.293l6.5-6.5z"/>
                    </svg>
                  </button>
                  <button className="btn-acao btn-excluir" onClick={() => onExcluir(inquilino.id)} title="Excluir">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

