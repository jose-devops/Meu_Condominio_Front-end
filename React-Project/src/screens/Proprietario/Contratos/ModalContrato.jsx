import React, { useState, useEffect } from 'react';
import './modal.css';

export default function ModalContrato({ contrato, onClose, onSalvar }) {
  const [imovel, setImovel] = useState('');
  const [inquilino, setInquilino] = useState('');
  const [dataPosse, setDataPosse] = useState('');
  const [dataDespejo, setDataDespejo] = useState('');
  const [valorMulta, setValorMulta] = useState('');
  const [valorAluguel, setValorAluguel] = useState('');
  const [modeloContrato, setModeloContrato] = useState('');
  const [status, setStatus] = useState('');
  const [tipoContrato, setTipoContrato] = useState('Venda');

  useEffect(() => {
    if (contrato) {
      setImovel(contrato.imovel || '');
      setInquilino(contrato.inquilino || '');
      setDataPosse(contrato.dataPosse || '');
      setDataDespejo(contrato.dataDespejo || '');
      setValorMulta(contrato.valorMulta || '');
      setValorAluguel(contrato.valorAluguel || '');
      setModeloContrato(contrato.modeloContrato || '');
      setStatus(contrato.status || '');
      setTipoContrato(contrato.tipoContrato || 'Venda');
    } else {
      setImovel('');
      setInquilino('');
      setDataPosse('');
      setDataDespejo('');
      setValorMulta('');
      setValorAluguel('');
      setModeloContrato('');
      setStatus('');
      setTipoContrato('Venda');
    }
  }, [contrato]);

  function salvar() {
    const novoContrato = {
      id: contrato?.id || null,
      imovel,
      inquilino,
      dataPosse,
      dataDespejo,
      valorMulta,
      valorAluguel,
      modeloContrato,
      status,
      tipoContrato
    };
    onSalvar(novoContrato);
  }

  return (
    <div className="modal-fundo" onClick={(e) => {
      // Fechar modal apenas se clicar no fundo
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-conteudo">
        <h3>CONTRATO</h3>
        <div className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Imóvel</label>
              <select value={imovel} onChange={e => setImovel(e.target.value)}>
                <option value="">Selecione...</option>
                {/* Opções serão preenchidas quando houver integração */}
              </select>
            </div>
            <div className="form-group">
              <label>Inquilino</label>
              <select value={inquilino} onChange={e => setInquilino(e.target.value)}>
                <option value="">Selecione...</option>
                {/* Opções serão preenchidas quando houver integração */}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data posse</label>
              <input 
                type="date" 
                value={dataPosse} 
                onChange={e => setDataPosse(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Data despejo</label>
              <input 
                type="date" 
                value={dataDespejo} 
                onChange={e => setDataDespejo(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valor multa</label>
              <input 
                type="text" 
                value={valorMulta} 
                onChange={e => setValorMulta(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Valor aluguel</label>
              <input 
                type="text" 
                value={valorAluguel} 
                onChange={e => setValorAluguel(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Modelo contrato</label>
              <select value={modeloContrato} onChange={e => setModeloContrato(e.target.value)}>
                <option value="">Selecione...</option>
                {/* Opções serão preenchidas quando houver integração */}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
          </div>

          <div className="form-group tipo-radio">
            <label>Tipo contrato:</label>
            <div className="radio-options">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="tipoContrato" 
                  value="Venda" 
                  checked={tipoContrato === 'Venda'} 
                  onChange={e => setTipoContrato(e.target.value)} 
                />
                Venda
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="tipoContrato" 
                  value="Aluguel" 
                  checked={tipoContrato === 'Aluguel'} 
                  onChange={e => setTipoContrato(e.target.value)} 
                />
                Aluguel
              </label>
            </div>
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
