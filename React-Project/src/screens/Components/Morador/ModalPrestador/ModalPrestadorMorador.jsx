import React, { useState, useEffect } from 'react';
import './modal.css'; // Certifique-se que o CSS correto está sendo importado



export default function ModalPrestadorMorador({ prestador, onClose, onSalvar }) {
    const [especialidades, setEspecialidades] = useState([]);
  


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
        telefone1: prestador.telefonePrincipal || '',  // aqui
        telefone2: prestador.telefoneSecundario || '',
        linkWhatsapp: prestador.linkWhatsapp || '', // Adicionar se existir no modelo de dados
      especialidade: (prestador.especialidade || prestador.profissao || '').trim().toUpperCase(),
        observacao: prestador.observacao || '' // Adicionar se existir no modelo de dados
      
      });
    }
  }, [prestador]);

  // Atualiza o estado do formulário quando um campo muda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };













  

  return (
    <div className="modal-fundo" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-prestador">
        <div className='modal-prestador-area'>

          <div className='modal-prestador-header'>
            <h1>PRESTADOR</h1>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

        </div>

          <div className="modal-form-prestador">

            <div className="row-form-prestador">

              <div className="form-group-prestador">
                <label>Nome</label>

                <input 
                  type="text" 
                  name="razao" 
                  placeholder="Razão" 
                  value={formData.razao}
                  onChange={handleChange} 
                  disabled
                />
              </div>


              <div className="form-group-prestador">
                <label>CPF / CNPJ</label>

                <input 
                  type="text" 
                  name="cpfCnpj" 
                  placeholder="CPF / CNPJ" 
                  value={formData.cpfCnpj}
                  onChange={handleChange}
                  disabled
                />

              </div>


            </div>

            <div className="row-form-prestador">
              <div className="form-group-prestador">
                <label>Telefone Principal</label>

                <input 
                  type="tel" // Usar type="tel" para telefones
                  name="telefone1" 
                  placeholder="Telefone principal" 
                  value={formData.telefone1}
                  onChange={handleChange}
                  disabled
               
                />
              </div>
              <div className="form-group-prestador">
                <label>Telefone Secundário</label>
                <input 
                  type="tel" 
                  name="telefone2" 
                  placeholder="Telefone secundário" 
                  value={formData.telefone2}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>

            <div className="row-form-prestador">
              <div className="form-group-prestador">
                <label>Instagram</label>
                <input 
                  type="text" // Poderia ser type="url" se for um link completo
                  name="linkWhatsapp" 
                  placeholder="Instagram" 
                  value={formData.linkWhatsapp}
                  onChange={handleChange}
                  disabled
                />
              </div>
                <div className="form-group-prestador">
                  <label>Especialidade</label>
                  <input
                    type="text"
                    name="especialidade"
                    value={formData.especialidade}
                    disabled
                  />

                  
                </div>
            </div>

            <div className="row-form-prestador">
              <div className="form-group-prestador full-width">
                <label>Observação</label>
                <textarea 
                  name="observacao" 
                  placeholder="Observação" 
                  rows="4" // Ajuste a altura conforme necessário
                  value={formData.observacao}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
          </div>



          <div className="buttons-prestador-form">
            <div className='botoes-prestador'>

            <button type="button" className="btn-cancelar" onClick={onClose}>FECHAR</button>
          
            </div>
          </div>
      </div>
    </div>
  );
}
