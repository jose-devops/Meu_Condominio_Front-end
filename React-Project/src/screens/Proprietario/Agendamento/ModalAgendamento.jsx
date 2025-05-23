import React, { useState, useEffect } from 'react';
import './modal.css';

export default function ModalAgendamento({ agendamento, onClose, onSalvar }) {
  const [descricao, setDescricao] = useState('');
  const [tipoAgendamento, setTipoAgendamento] = useState('');
  const [status, setStatus] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('Proprietário');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [observacao, setObservacao] = useState('');

  useEffect(() => {
    if (agendamento) {
      setDescricao(agendamento.descricao || '');
      setTipoAgendamento(agendamento.tipo || '');
      setStatus(agendamento.status || '');
      setTipoPessoa(agendamento.tipoPessoa || 'Proprietário');
      setDataInicio(agendamento.dataInicio || '');
      setDataFim(agendamento.dataFim || '');
      setObservacao(agendamento.observacao || '');
    } else {
      setDescricao('');
      setTipoAgendamento('');
      setStatus('');
      setTipoPessoa('Proprietário');
      setDataInicio('');
      setDataFim('');
      setObservacao('');
    }
  }, [agendamento]);

  function salvar() {
    const novoAgendamento = {
      id: agendamento?.id || null,
      descricao,
      tipo: tipoAgendamento,
      tipoPessoa,
      dataInicio,
      dataFim,
      status,
      observacao,
    };
    onSalvar(novoAgendamento);
  }

  return (
    <div className="modal-fundo" onClick={(e) => {
      // Fechar modal apenas se clicar no fundo
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-conteudo">
        <h3>AGENDAMENTO</h3>
        <div className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Descrição</label>
              <input value={descricao} onChange={e => setDescricao(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tipo agendamento</label>
              <select value={tipoAgendamento} onChange={e => setTipoAgendamento(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Técnico">Técnico</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Manutenção">Manutenção</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Agendado">Agendado</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <div className="form-group tipo-radio">
              <label>Tipo:</label>
              <div className="radio-options">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="tipoPessoa" 
                    value="Proprietário" 
                    checked={tipoPessoa === 'Proprietário'} 
                    onChange={e => setTipoPessoa(e.target.value)} 
                  />
                  Proprietário
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="tipoPessoa" 
                    value="Inquilino" 
                    checked={tipoPessoa === 'Inquilino'} 
                    onChange={e => setTipoPessoa(e.target.value)} 
                  />
                  Inquilino
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data Início</label>
              <input 
                type="date" 
                value={dataInicio} 
                onChange={e => setDataInicio(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Data Fim</label>
              <input 
                type="date" 
                value={dataFim} 
                onChange={e => setDataFim(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Observação</label>
            <textarea 
              value={observacao} 
              onChange={e => setObservacao(e.target.value)} 
              rows="4"
            />
          </div>

          <div className="botoes">
            <button onClick={salvar} className="btn-cadastrar">CADASTRAR</button>
            <button onClick={onClose} className="btn-cancelar">CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
