import React, { useState, useEffect, useRef } from 'react';
import './ModalAgendamentoMorador.css';

import {
  cadastrarAgendamentoMorador,
  editarAgendamentoMorador,
  listarTiposAgendamento,
  listarStatusAgendamento
} from '../../../../api/Morador-Api/AgendamentoMoradorService';



export default function ModalAgendamentoMorador({ agendamentoMorador, token, onClose, onSalvar }) {
  const [descricao, setDescricao] = useState('');
  const [tipoAgendamento, setTipoAgendamento] = useState('');
  const [local, setLocalAgendamento] = useState('');
  const [status, setStatus] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('Morador');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [observacao, setObservacao] = useState('');
  const [tiposAgendamento, setTiposAgendamento] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [erros, setErros] = useState({});
  const modalRef = useRef(null);

  function getMoradorIdFromToken(token) {
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return Number(payload.id || payload.sub || null);
    } catch {
      return null;
    }
  }

  const moradorId = getMoradorIdFromToken(token);

    useEffect(() => {
      if (agendamentoMorador) {
        setDescricao(agendamentoMorador.descricao || '');
        setTipoAgendamento(agendamentoMorador.tipoAgendamento || '');
        setLocalAgendamento(agendamentoMorador.local || '');
        setStatus(agendamentoMorador.status || '');
        setDataInicio(agendamentoMorador.dataInicio?.slice(0, 16) || '');
        setDataFim(agendamentoMorador.dataFim?.slice(0, 16) || '');
        setObservacao(agendamentoMorador.observacao || '');
      } else {
       
        setDescricao('');
        setTipoAgendamento('');
        setLocalAgendamento('');
        setStatus('');
        setDataInicio('');
        setDataFim('');
        setObservacao('');
      }
    }, [agendamentoMorador]);

    useEffect(() => {
      listarStatusAgendamento().then(setStatusOptions);
      listarTiposAgendamento()
        .then(setTiposAgendamento)
        .catch((err) =>
          console.error('Erro ao carregar tipos de agendamento:', err)
        );
    }, []);

    const formatarParaLocalDateTime = (dataString) => {
      if (!dataString.includes(':')) return dataString + 'T00:00:00';
      if (dataString.length === 16) return dataString + ':00'; // datetime-local retorna até minutos
      return dataString; // já completo
    };




  const handleSalvarAgendamento = async () => {
    const novosErros = {};

    if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória.";
    if (!tipoAgendamento) novosErros.tipoAgendamento = "Tipo é obrigatório.";
    if (!status) novosErros.status = "Status é obrigatório.";
    if (!local.trim()) novosErros.local = "Local é obrigatório.";
    if (!dataInicio) novosErros.dataInicio = "Data de início é obrigatória.";
    if (!dataFim) novosErros.dataFim = "Data de fim é obrigatória.";
    if (dataInicio && dataFim && new Date(dataInicio) > new Date(dataFim)) {
      novosErros.dataFim = "Data de fim deve ser após o início.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});

    const dados = {
      descricao,
      tipoAgendamento,
      status,
      local,
      dataInicio: formatarParaLocalDateTime(dataInicio),
      dataFim: formatarParaLocalDateTime(dataFim),
      observacao,
      id: agendamentoMorador?.id
    };

    try {
      if (agendamentoMorador) {
        await editarAgendamentoMorador(dados);
        onSalvar({ tipo: "sucesso", mensagem: "Agendamento atualizado com sucesso!" });
      } else {
        await cadastrarAgendamentoMorador(dados);
        onSalvar({ tipo: "sucesso", mensagem: "Agendamento cadastrado com sucesso!" });
      }
    } catch (error) {
      console.error(error);
      onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o agendamento." });
    }


  };

  return (
    <div
      className="morador-modal-fundo"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div className="morador-modal-agendamento" ref={modalRef}>
        <div className='morador-modal-agendamento-area'>
          <div className='morador-modal-agendamento-header'>
            <h1>AGENDAMENTO</h1>
            <button className="morador-close-button" onClick={onClose}>
              <i className="fas fa-times"></i> 
            </button>
          </div>
          <div className="morador-modal-form-agendamento">
            <div className="morador-row-form-agendamento">
              <div className="morador-form-group-agendamento">
                <label>Descrição</label>
                <input
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                {erros.descricao && <span className="morador-erro-campo">{erros.descricao}</span>}
              </div>
              <div className="morador-form-group-agendamento">
                <label>Tipo agendamento</label>
                <select
                  value={tipoAgendamento}
                  onChange={(e) => setTipoAgendamento(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {tiposAgendamento.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo
                        .replace('_', ' ')
                        .toLowerCase()
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
                {erros.tipoAgendamento && <span className="morador-erro-campo">{erros.tipoAgendamento}</span>}
              </div>
            </div>
            <div className="morador-row-form-agendamento">
              <div className="morador-form-group-agendamento">
                <label>Local</label>
                <input
                  value={local}
                  onChange={(e) => setLocalAgendamento(e.target.value)}
                />
                {erros.local && <span className="morador-erro-campo">{erros.local}</span>}
              </div>
              <div className="morador-form-group-agendamento">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Selecione...</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                {erros.status && <span className="morador-erro-campo">{erros.status}</span>}
              </div>
            </div>
            <div className="morador-row-form-agendamento">
              <div className="morador-form-group-agendamento">
                <label>Data Início</label>
                <input
                  type="datetime-local"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
                {erros.dataInicio && <span className="morador-erro-campo">{erros.dataInicio}</span>}
              </div>
              <div className="morador-form-group-agendamento">
                <label>Data Fim</label>
                <input
                  type="datetime-local"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
                {erros.dataFim && <span className="morador-erro-campo">{erros.dataFim}</span>}
              </div>
            </div>
            <div className="morador-form-group-agendamento morador-full-width">
              <label>Observação</label>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows="4"
              />
            </div>
          </div>
          <div className='morador-buttons-agendamento-form'>
            <div className="morador-botoes-agendamento">
                <button
                  onClick={handleSalvarAgendamento}
                  className="morador-btn-cadastrar-agendamento"
                >
                  {agendamentoMorador ? 'SALVAR' : 'CADASTRAR'}
                </button>
                <button onClick={onClose} className="morador-btn-cancelar-agendamento">
                  CANCELAR
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
