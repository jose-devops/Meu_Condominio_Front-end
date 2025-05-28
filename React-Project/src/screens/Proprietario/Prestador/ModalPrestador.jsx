import React, { useState, useEffect } from 'react';
import './modal.css'; // Certifique-se que o CSS correto está sendo importado

export default function ModalPrestador({ prestador, onClose, onSalvar }) {
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    razao: '',
    cpfCnpj: '',
    telefone1: '',
    telefone2: '',
    linkWhatsapp: '',
    especialidade: '',
    observacao: ''
  });

  // Preenche o formulário se um prestador existente for passado (modo edição)
  useEffect(() => {
    if (prestador) {
      setFormData({
        razao: prestador.razao || '',
        cpfCnpj: prestador.cpfCnpj || '',
        telefone1: prestador.telefone1 || '',
        telefone2: prestador.telefone2 || '',
        linkWhatsapp: prestador.linkWhatsapp || '', // Adicionar se existir no modelo de dados
        especialidade: prestador.profissao || '', // Mapear profissao para especialidade
        observacao: prestador.observacao || '' // Adicionar se existir no modelo de dados
      });
    }
  }, [prestador]);

  // Atualiza o estado do formulário quando um campo muda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com o salvamento
  const handleSalvar = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    // Adiciona lógica de validação se necessário
    onSalvar({ ...prestador, ...formData }); // Envia os dados atualizados/novos
  };

  // Lista de especialidades (exemplo, idealmente viria de uma fonte externa)
  const especialidades = [
    "Pedreiro",
    "Eletricista",
    "Encanador",
    "Pintor",
    "Jardineiro",
    "Programador",
    "Médico"
    // Adicione mais especialidades conforme necessário
  ];

  return (
    <div className="modal-overlay"> {/* Fundo escurecido */}
      <div className="modal-content"> {/* Conteúdo do modal */}
        <div className="modal-header">
          <h4>PRESTADOR</h4>
          <button onClick={onClose} className="btn-fechar" aria-label="Fechar">×</button>
        </div>

        <form onSubmit={handleSalvar}> {/* Usar form para semântica e submit */} 
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  name="razao" 
                  placeholder="Razão" 
                  value={formData.razao}
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="cpfCnpj" 
                  placeholder="CPF / CNPJ" 
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input 
                  type="tel" // Usar type="tel" para telefones
                  name="telefone1" 
                  placeholder="Telefone principal" 
                  value={formData.telefone1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  name="telefone2" 
                  placeholder="Telefone secundário" 
                  value={formData.telefone2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" // Poderia ser type="url" se for um link completo
                  name="linkWhatsapp" 
                  placeholder="Link WhatsApp" 
                  value={formData.linkWhatsapp}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select 
                  name="especialidade" 
                  value={formData.especialidade}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Especialidade</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <textarea 
                  name="observacao" 
                  placeholder="Observação" 
                  rows="4" // Ajuste a altura conforme necessário
                  value={formData.observacao}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-cadastrar">CADASTRAR</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>CANCELAR</button> {/* type="button" para não submeter */} 
          </div>
        </form>
      </div>
    </div>
  );
}
