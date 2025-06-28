import React, { useState, useEffect } from 'react';
import './ModalContratoMorador.css'; // Alteração no nome do CSS
import { listarContratoMorador } from '../../../../api/Morador-Api/ContratoMoradorService';

import axios from 'axios';

export default function ModalContratoMorador({ contrato, onClose, onSalvar, token, somenteVisualizar = false  }) {

  const [imoveis, setImoveis] = useState([]);
  const [moradores, setMoradores] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [imovel, setImovel] = useState('');

  const [contratoMorador, setContratoMorador] = useState(null);

  const [morador, setMorador] = useState(contrato?.morador || '');

  const [dataPosse, setDataPosse] = useState(contrato?.dataPosse || '');
  const [dataDespejo, setDataDespejo] = useState(contrato?.dataDespejo || '');
  const [valorMulta, setValorMulta] = useState(contrato?.valorMulta || '');
  const [valorAluguel, setValorAluguel] = useState(contrato?.valorAluguel || '');
  const [dataAssinatura, setDataAssinatura] = useState(contrato?.dataAssinatura || '');
  const [status, setStatus] = useState(contrato?.status || '');
  const [tipoContrato, setTipoContrato] = useState(contrato?.tipoContrato || 'Venda');
  const [observacao, setObservacao] = useState(contrato?.observacao || '');
  const [modeloContrato, setModeloContrato] = useState(null);
  const [arquivoExistente, setArquivoExistente] = useState(null);




  

  const [erros, setErros] = useState({});


  useEffect(() => {
  const carregarContrato = async () => {
    try {
      const data = await listarContratoMorador();
      if (data.length > 0) {
        setContratoMorador(data[0]); // Corrigido aqui
      }
    } catch (error) {
      console.error('Erro ao carregar contrato:', error);
    }
  };;

    carregarContrato();
  }, []);



  useEffect(() => {
    if (!contratoMorador) return;

    console.log(contratoMorador);
    

    setArquivoExistente(contratoMorador.arquivoContratoUrl || null);

    setTipoContrato(
      contratoMorador.tipoContrato === 'ALUGUEL' ? 'Aluguel' :
      contratoMorador.tipoContrato === 'VENDA' ? 'Venda' :
      'Venda'
    );

    setMorador(contratoMorador.nomeMorador || ''); 


    setImovel(contratoMorador.nomeImovel || '');
 
    setDataPosse(contratoMorador.dataInicioVigencia || '');
    setDataDespejo(contratoMorador.dataFimVigencia || '');
    setValorMulta(contratoMorador.valorMulta?.toString() || '');
    setValorAluguel(contratoMorador.valorAluguel?.toString() || '');
    setDataAssinatura(contratoMorador.dataAssinatura || '');
    setStatus(contratoMorador.status || '');
    setObservacao(contratoMorador.observacao || '');
    setModeloContrato(null);

    console.log(contratoMorador);
  }, [contratoMorador]);




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

  function abreviarNomeArquivo(nome, limite = 30) {
    if (!nome) return '';
    return nome.length <= limite
      ? nome
      : nome.slice(0, limite / 2) + '...' + nome.slice(-10);
  }



  const handleAbrirContrato = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/contratos/download/${contratoMorador.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Erro ao abrir contrato");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="modal-fundo" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-contrato-morador">
        <div className='modal-contrato-morador-area'>
          <div className='modal-contrato-morador-header'>
            <h1>CONTRATO</h1>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-form-contrato-morador">
            <div className='form-contrato-morador-cols'>
              <div className='col-1-form-contrato-morador'>
                <div className="form-group-contrato-morador-tipo-radio">
                  <label className='desc-raddio'>
                    <span>Tipo:</span>
                  </label>
                  <div className="radio-options-contrato-morador">
                    <label className="radio-label">
                      <input 
                        disabled
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
                        disabled
                        type="radio" 
                        name="tipoContrato" 
                        value="Aluguel" 
                        checked={tipoContrato === 'Aluguel'} 
                        onChange={e => setTipoContrato(e.target.value)} 
                      />
                      Aluguel
                    </label>
                    {erros.tipo && <div className="campo-erro">{erros.tipo}</div>}
                  </div>
                </div>

                <div className="form-group-contrato-morador">
                  <label>Morador</label>
                    <select disabled value={morador} onChange={e => setMorador(e.target.value)}>
                      <option value={morador}>{morador}</option> 
                    </select>
                  {erros.morador && <div className="campo-erro">{erros.morador}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Data posse</label>
                  <input disabled type="date" value={dataPosse} onChange={e =>{setDataPosse(e.target.value); setErros(prev => ({ ...prev, dataPosse: undefined })); }} />
                  {erros.dataPosse && <div className="campo-erro">{erros.dataPosse}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Valor multa</label>
                  <input disabled type="text" value={valorMulta} onChange={e => { setValorMulta(e.target.value); setErros(prev => ({ ...prev, valorMulta: undefined })); }} />
                  {erros.valorMulta && <div className="campo-erro">{erros.valorMulta}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Data assinatura</label>
                  <input disabled type="date" value={dataAssinatura} onChange={e => {setDataAssinatura(e.target.value); setErros(prev => ({ ...prev, dataAssinatura: undefined })); }} />
                  {erros.dataAssinatura && <div className="campo-erro">{erros.dataAssinatura}</div>}
                </div>
              </div>

              <div className='col-2-form-contrato-morador'>
                <div className="form-group-contrato-morador">
                  <label>Imóvel</label>
                    <select disabled value={imovel} onChange={e => setImovel(e.target.value)}>
                      <option value={imovel}>{imovel}</option> 
                    </select>
                    {erros.imovel && <div className="campo-erro">{erros.imovel}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Status</label>
                    <select disabled  value={status} onChange={e => setStatus(e.target.value)}>
                      <option  value={status}>{status}</option> 
                    </select>
                  {erros.status && <div className="campo-erro">{erros.status}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Data despejo</label>
                  <input disabled type="date" value={dataDespejo} onChange={e => {setDataDespejo(e.target.value); setErros(prev => ({ ...prev, dataDespejo: undefined })); }} />
                  {erros.dataDespejo && <div className="campo-erro">{erros.dataDespejo}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Valor aluguel</label>
                  <input disabled type="text" value={valorAluguel} onChange={e => { setValorAluguel(e.target.value); }} />
                  {erros.valorAluguel && <div className="campo-erro">{erros.valorAluguel}</div>}
                </div>

                <div className="form-group-contrato-morador">
                  <label>Modelo contrato</label>
                  <div className='file'>
                    {arquivoExistente ?  (
                      <div className="arquivo-salvo-info" >
                        <span className='name-arquivo'>
                          <strong>{abreviarNomeArquivo(arquivoExistente.split('/').pop())}</strong>
                        </span>
                        <button
                          
                          type="button"
                          className="btn-substituir-arquivo"
                          onClick={() => {
                            setArquivoExistente(null);
                            setModeloContrato(null);
                          }}
                          disabled
                          title="Substituir arquivo"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <input
                        disabled
                        type="file"
                        onChange={(e) => {
                          setModeloContrato(e.target.files[0]);
                          setErros(prev => ({ ...prev, modeloContrato: undefined }));
                        }}
                        accept=".pdf,.doc,.docx"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row-form-contrato-morador">
              <div className="form-group-contrato-morador full-width">
                <label>Observação</label>
                <textarea disabled value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="2" />
              </div>
            </div>

            <div className='buttons-contrato-morador-form'>
              <div className='botoes-contrato-morador'>
                  {contratoMorador?.id && (
                    <button onClick={handleAbrirContrato} className="btn-download-contrato-morador">
                      <i className="fas fa-external-link-alt"></i> ABRIR CONTRATO
                    </button>
                  )}

                <button onClick={onClose} className="btn-cancelar-contrato-morador">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
