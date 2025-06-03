import React, { useState, useEffect, useRef } from 'react';

import './modal.css';

import {
  cadastrarAgendamentoProprietario,
  editarAgendamentoProprietario,
  listarTiposAgendamento,
  listarStatusAgendamento
} from '../../../api/Proprietario-Api/AgendamentoService';

export default function ModalAgendamento({ agendamento, token, onClose, onSalvar }) {
  const [descricao, setDescricao] = useState('');
  const [tipoAgendamento, setTipoAgendamento] = useState('');
  const [local, setLocalAgendamento] = useState('');
  const [status, setStatus] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState('Proprietário');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [observacao, setObservacao] = useState('');
  const [tiposAgendamento, setTiposAgendamento] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [erros, setErros] = useState({});
  const modalRef = useRef(null);

  // Função para extrair proprietarioId do token JWT
  function getProprietarioIdFromToken(token) {
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

  const proprietarioId = getProprietarioIdFromToken(token);

  useEffect(() => {
    if (agendamento) {
      setDescricao(agendamento.descricao || '');
      setTipoAgendamento(agendamento.tipoAgendamento || '');
      setLocalAgendamento(agendamento.local || '');
      setStatus(agendamento.status || '');
      setDataInicio(agendamento.dataInicio?.slice(0, 16) || '');
      setDataFim(agendamento.dataFim?.slice(0, 16) || '');
      setObservacao(agendamento.observacao || '');
    } else {
      // Limpar campos ao abrir modal novo
      setDescricao('');
      setTipoAgendamento('');
      setLocalAgendamento('');
      setStatus('');
      setDataInicio('');
      setDataFim('');
      setObservacao('');
    }
  }, [agendamento]);

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
      id: agendamento?.id
    };

    try {
      if (agendamento) {
        await editarAgendamentoProprietario(dados);
        onSalvar({ tipo: "sucesso", mensagem: "Agendamento atualizado com sucesso!" });
      } else {
        await cadastrarAgendamentoProprietario(dados);
        onSalvar({ tipo: "sucesso", mensagem: "Agendamento cadastrado com sucesso!" });
      }
    } catch (error) {
      console.error(error);
      onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o agendamento." });
    }
  };

  return (
    <div
      className="modal-fundo"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div className="modal-conteudo" ref={modalRef}>
        <h3>AGENDAMENTO</h3>
        <div className="modal-form">

          <div className="form-row">
            <div className="form-group">
              <label>Descrição</label>
              <input
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              {erros.descricao && <span className="erro-campo">{erros.descricao}</span>}
            </div>

            <div className="form-group">
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
              {erros.tipoAgendamento && <span className="erro-campo">{erros.tipoAgendamento}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Local</label>
              <input
                value={local}
                onChange={(e) => setLocalAgendamento(e.target.value)}
              />
              {erros.local && <span className="erro-campo">{erros.local}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Selecione...</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {erros.status && <span className="erro-campo">{erros.status}</span>}
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
                    onChange={(e) => setTipoPessoa(e.target.value)}
                  />
                  Proprietário
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="tipoPessoa"
                    value="Inquilino"
                    checked={tipoPessoa === 'Inquilino'}
                    onChange={(e) => setTipoPessoa(e.target.value)}
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
                type="datetime-local"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
              {erros.dataInicio && <span className="erro-campo">{erros.dataInicio}</span>}
            </div>
            <div className="form-group">
              <label>Data Fim</label>
              <input
                type="datetime-local"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
              {erros.dataFim && <span className="erro-campo">{erros.dataFim}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Observação</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              rows="4"
            />
          </div>

          <div className="botoes">
            <button
              onClick={handleSalvarAgendamento}
              className="btn-cadastrar"
            >
              {agendamento ? 'SALVAR' : 'CADASTRAR'}
            </button>
            <button onClick={onClose} className="btn-cancelar">
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
