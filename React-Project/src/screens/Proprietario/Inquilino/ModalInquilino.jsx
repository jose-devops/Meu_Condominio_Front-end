import React, { useState, useEffect } from 'react';
import './modal.css'; // Certifique-se que este CSS está adequado ou crie um novo

export default function ModalInquilino({ inquilino, onClose, onSalvar }) {
  // Estado inicial do formulário VAZIO, conforme solicitado
  const estadoInicialVazio = {
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '', // Campo único de telefone conforme 4.png
    rendaMensal: '',
    profissao: '',
    email: '',
    senha: '',
    observacao: ''
  };

  const [formData, setFormData] = useState(estadoInicialVazio);

  // Preenche o formulário SOMENTE se um inquilino existente for passado (modo edição)
  useEffect(() => {
    if (inquilino) {
      setFormData({
        nome: inquilino.nome || '',
        cpf: inquilino.cpf || '',
        // Formatar data para YYYY-MM-DD se necessário para input type="date"
        dataNascimento: inquilino.dataNascimento ? new Date(inquilino.dataNascimento).toISOString().split('T')[0] : '',
        telefone: inquilino.telefone1 || inquilino.telefone || '', // Usar telefone1 ou telefone se existir
        rendaMensal: inquilino.rendaMensal || '',
        profissao: inquilino.profissao || '',
        email: inquilino.email || '',
        senha: '', // Senha nunca é pré-preenchida na edição por segurança
        observacao: inquilino.observacao || ''
      });
    } else {
      // Garante que ao abrir para NOVO, o estado esteja vazio
      setFormData(estadoInicialVazio);
    }
  }, [inquilino]); // Dependência apenas no inquilino

  // Atualiza o estado do formulário quando um campo muda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com o salvamento
  const handleSalvar = (e) => {
    e.preventDefault();
    // Mapear de volta para o modelo de dados, se necessário
    // Ex: Se o backend espera telefone1 e telefone2, decidir como mapear o campo 'telefone'
    const dadosParaSalvar = {
      ...inquilino, // Mantém ID e outros campos não editáveis se estiver editando
      ...formData,
      // Exemplo: Mapear 'telefone' para 'telefone1' no objeto final
      telefone1: formData.telefone,
      // telefone2: inquilino?.telefone2 // Manter telefone2 se existir e não for editável no modal
    };

    // Remover campo senha se estiver vazio e for edição (não atualizar senha)
    if (inquilino && !formData.senha) {
        delete dadosParaSalvar.senha;
    }

    onSalvar(dadosParaSalvar);
  };

  return (
    <div className="modal-overlay"> {/* Fundo escurecido */}
      <div className="modal-content modal-inquilino"> {/* Conteúdo do modal - Adicionar classe específica se necessário */} 
        <div className="modal-header">
          <h4>INQUILINO</h4>
          <button onClick={onClose} className="btn-fechar" aria-label="Fechar">×</button>
        </div>

        <form onSubmit={handleSalvar}>
          <div className="modal-body">
            {/* Linha 1: Nome e CPF */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                  // Adicionar máscara de CPF se desejado
                />
              </div>
            </div>

            {/* Linha 2: Data aniversário e Telefone */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dataNascimento">Data aniversário</label>
                <input
                  id="dataNascimento"
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  // Adicionar máscara de telefone se desejado
                />
              </div>
            </div>

            {/* Linha 3: Renda mensal e Profissão */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rendaMensal">Renda mensal</label>
                <input
                  id="rendaMensal"
                  type="number" // Usar number para facilitar entrada e validação
                  step="0.01" // Para permitir centavos
                  name="rendaMensal"
                  value={formData.rendaMensal}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profissao">Profissão</label>
                <input
                  id="profissao"
                  type="text"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Linha 4: Email e Senha */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  name="senha"
                  placeholder={inquilino ? "Deixe em branco para não alterar" : ""} // Hint para edição
                  value={formData.senha}
                  onChange={handleChange}
                  // Não adicionar 'required' aqui, pode ser opcional ou obrigatório só na criação
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Linha 5: Observação */}
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="observacao">Observação</label>
                <textarea
                  id="observacao"
                  name="observacao"
                  rows="4"
                  value={formData.observacao}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {/* Botões conforme 4.png */}
            <button type="submit" className="btn-cadastrar">CADASTRAR</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

