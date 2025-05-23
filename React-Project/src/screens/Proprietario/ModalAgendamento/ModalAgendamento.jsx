import React, { useState, useEffect } from 'react';
import './ModalAgendamento.css';

/**
 * Componente de Modal para criação e edição de agendamentos
 */
const ModalAgendamento = ({ agendamento, onClose, onSalvar }) => {
  const [descricao, setDescricao] = useState('');
  const [tipoAgendamento, setTipoAgendamento] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [tipo, setTipo] = useState('proprietario'); // proprietario ou inquilino
  const [observacao, setObservacao] = useState('');

  useEffect(() => {
    if (agendamento) {
      setDescricao(agendamento.descricao || '');
      setTipoAgendamento(agendamento.tipoAgendamento || '');
      setDataInicio(agendamento.dataInicio || '');
      setDataFim(agendamento.dataFim || '');
      setTipo(agendamento.tipo || 'proprietario');
      setObservacao(agendamento.observacao || '');
    } else {
      // Valores padrão para novo agendamento
      setDescricao('');
      setTipoAgendamento('');
      setDataInicio('');
      setDataFim('');
      setTipo('proprietario');
      setObservacao('');
    }
  }, [agendamento]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoAgendamento = {
      id: agendamento?.id || null,
      descricao,
      tipoAgendamento,
      dataInicio,
      dataFim,
      tipo,
      observacao,
      status: agendamento?.status || 'Agendado'
    };
    onSalvar(novoAgendamento);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>AGENDAMENTO</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Descrição:</label>
                <input 
                  type="text" 
                  value={descricao} 
                  onChange={(e) => setDescricao(e.target.value)}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Tipo agendamento:</label>
                <select 
                  value={tipoAgendamento} 
                  onChange={(e) => setTipoAgendamento(e.target.value)}
                  className="form-control"
                >
                  <option value="">Selecione</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Reunião">Reunião</option>
                  <option value="Visita">Visita</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Status:</label>
                <select 
                  value={tipo} 
                  onChange={(e) => setTipo(e.target.value)}
                  className="form-control"
                >
                  <option value="proprietario">Proprietário</option>
                  <option value="inquilino">Inquilino</option>
                </select>
              </div>
              
              <div className="form-group radio-group">
                <label>Tipo:</label>
                <div className="radio-options">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="tipo" 
                      value="proprietario" 
                      checked={tipo === 'proprietario'} 
                      onChange={() => setTipo('proprietario')} 
                    />
                    Proprietário
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="tipo" 
                      value="inquilino" 
                      checked={tipo === 'inquilino'} 
                      onChange={() => setTipo('inquilino')} 
                    />
                    Inquilino
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Data início:</label>
                <input 
                  type="date" 
                  value={dataInicio} 
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Data fim:</label>
                <input 
                  type="date" 
                  value={dataFim} 
                  onChange={(e) => setDataFim(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label>Observação:</label>
                <textarea 
                  value={observacao} 
                  onChange={(e) => setObservacao(e.target.value)}
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="submit" className="btn-cadastrar">CADASTRAR</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgendamento;
