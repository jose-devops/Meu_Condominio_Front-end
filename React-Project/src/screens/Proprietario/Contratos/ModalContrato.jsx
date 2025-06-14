import React, { useState, useEffect } from 'react';
import './modal.css';
import {listarImoveis, listarMoradores, listarStatusContrato, cadastrarContrato, alterarContrato}  from '../../../api/Proprietario-Api/ContratoService';

import axios from 'axios';


export default function ModalContrato({ contrato, onClose, onSalvar, token, }) {

  const [imoveis, setImoveis] = useState([]);
  const [moradores, setMoradores] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [imovel, setImovel] = useState('');



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
  const [erros, setErros] = useState({});





useEffect(() => {
  async function fetchData() {
    try {
      const imoveisData = await listarImoveis();
      const moradoresData = await listarMoradores();
      const statusData = await listarStatusContrato();

      setImoveis(imoveisData); 
      setMoradores(moradoresData);
      setStatusOptions(statusData);
    } catch (error) {
      console.error("Erro ao carregar imóveis ou moradores", error);
    }
  }

  fetchData();
}, []);



useEffect(() => {
  if (!contrato) return;



  // Define o tipo de contrato formatado
  setTipoContrato(
    contrato.tipoContrato === 'ALUGUEL' ? 'Aluguel' :
    contrato.tipoContrato === 'VENDA' ? 'Venda' :
    'Venda' // Valor padrão
  );

  // Define o imóvel - corrigido aqui
  setImovel(contrato.imovel?.id?.toString() || contrato.imovelId?.toString() || '');

  // Restante dos campos
  setMorador(contrato.morador?.id?.toString() || contrato.moradorId?.toString() || '');
  setDataPosse(contrato.dataInicioVigencia || '');
  setDataDespejo(contrato.dataFimVigencia || '');
  setValorMulta(contrato.valorMulta?.toString() || '');
  setValorAluguel(contrato.valorAluguel?.toString() || '');
  setDataAssinatura(contrato.dataAssinatura || '');
  setStatus(contrato.status || '');
  setObservacao(contrato.observacao || '');
  setModeloContrato(null);

    console.log(contrato)
}, [contrato]); // Removidas as dependências desnecessárias


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




// ModalContrato.jsx
const handleSalvarContrato = async (e) => {
  e.preventDefault();

  const contratosErros={};
  if (!morador)             contratosErros.morador            = "Preencha o morador";
  if (!imovel)              contratosErros.imovel             = "Preencha o imóvel";
  if (!status)              contratosErros.status             = "Preencha o status";
  if (!dataPosse)           contratosErros.dataPosse          = "Preencha a data da posse";
  if (!dataDespejo)         contratosErros.dataDespejo        = "Preencha a data de despejo";
  if (!valorMulta)          contratosErros.valorMulta         = "Preencha o valor da multa";
  if (!valorAluguel)        contratosErros.valorAluguel       = "Preencha o valor do aluguel";
  if (!dataAssinatura)      contratosErros.dataAssinatura     = "Preencha a data de assinatura";
 

  setErros(contratosErros);

    if (Object.keys(contratosErros).length > 0) {
      setErros(contratosErros);
      return;
    }

  const contratoData = {
    id: contrato?.id || null, // usado na edição
    imovelId: imovel,
    moradorId: morador,
    dataDespejo: dataDespejo || undefined,
    valorMulta: valorMulta ? Number(valorMulta) : undefined,
    valorAluguel: valorAluguel ? Number(valorAluguel) : undefined,
    status: status || undefined,
    tipoContrato: tipoContrato.toUpperCase(),
    observacao: observacao || undefined,
    dataAssinatura,
    dataInicioVigencia: dataPosse || undefined,
    dataFimVigencia: dataDespejo
  };

  try {
    
    if (contrato?.id) {
      // Edição
      await alterarContrato(contrato.id, contratoData, modeloContrato);
      onSalvar({ tipo: "sucesso", mensagem: "Contrato atualizado com sucesso!" });
    } else {
      // Criação
      await cadastrarContrato(contratoData, modeloContrato);
      onSalvar({ tipo: "sucesso", mensagem: "Contrato cadastrado com sucesso!" });
    }
  } catch (error) {
    console.error(error);
    onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o contrato." });
  }
};


  return (
    <div className="modal-fundo" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-contrato">
        <div className='modal-contrato-area'>
          <div className='modal-contrato-header'>
            <h1>CONTRATO</h1>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-form-contrato">

            <div className='form-contrato-cols'>

              <div className='col-1-form-contrato'>

                <div className="form-group-contrato-tipo-radio">
                  <label className='desc-raddio'>
                    <span>Tipo:</span>
                  </label>
                  <div className="radio-options-contrato">
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
                        onChange={e => {
                          setTipoContrato(e.target.value)
                        
                        }} 
                      />
                      Aluguel
                    </label>
                    {erros.tipo && <div className="campo-erro">{erros.tipo}</div>}

                  </div>

                </div>

                <div className="form-group-contrato">
                  <label>Morador</label>
                  <select value={morador} onChange={e => {setMorador(e.target.value); setErros(prev => ({ ...prev, morador: undefined }));
 }}>
                    <option value="">Selecione...</option>
                    {moradores.map((morador) => (
                      <option key={morador.id} value={morador.id}>
                        {morador.nome} {/* Exibindo o nome do morador */}
                      </option>
                    ))}
                  </select>
                  {erros.morador && <div className="campo-erro">{erros.morador}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Data posse</label>
                  <input type="date" value={dataPosse} onChange={e =>{setDataPosse(e.target.value); setErros(prev => ({ ...prev, dataPosse: undefined }));   }} />
                  {erros.dataPosse && <div className="campo-erro">{erros.dataPosse}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Valor multa</label>
                  <input type="text" value={valorMulta} onChange={e => { setValorMulta(e.target.value); setErros(prev => ({ ...prev, valorMulta: undefined }));    }} />
                  {erros.valorMulta && <div className="campo-erro">{erros.valorMulta}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Data assinatura</label>
                  <input type="date" value={dataAssinatura} onChange={e => {setDataAssinatura(e.target.value); setErros(prev => ({ ...prev, dataAssinatura: undefined })); } } />
                  {erros.dataAssinatura && <div className="campo-erro">{erros.dataAssinatura}</div>}

                </div>
              </div>

              <div className='col-2-form-contrato'>
                <div className="form-group-contrato">
                  <label>Imóvel</label>
                    <select value={imovel} onChange={e =>{ setImovel(e.target.value.toString());   setErros(prev => ({ ...prev, imovel: undefined }));      }}>
                      <option value="">Selecione...</option>
                      {imoveis.map((imovelObj) => (
                        <option key={imovelObj.id} value={imovelObj.id.toString()}>
                          {imovelObj.descricao}
                        </option>
                      ))}
                    </select>
                    {erros.imovel && <div className="campo-erro">{erros.imovel}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Status</label>
                  <select value={status} onChange={e => {setStatus(e.target.value); setErros(prev => ({ ...prev, status: undefined }));     }}>
                    <option value="">Selecione...</option>
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {erros.status && <div className="campo-erro">{erros.status}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Data despejo</label>
                  <input type="date" value={dataDespejo} onChange={e => {setDataDespejo(e.target.value); setErros(prev => ({ ...prev, dataDespejo: undefined })); }} />
                  {erros.dataDespejo && <div className="campo-erro">{erros.dataDespejo}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Valor aluguel</label>
                  <input type="text" value={valorAluguel} onChange={e => { setValorAluguel(e.target.value); }} />
                  {erros.valorAluguel && <div className="campo-erro">{erros.valorAluguel}</div>}

                </div>

                <div className="form-group-contrato">
                  <label>Modelo contrato</label>
                  <input 
                    type="file" 
                    onChange={(e) => {
                      setModeloContrato(e.target.files[0]);
                      console.log("Arquivo selecionado:", e.target.files[0]); 
                      setErros(prev => ({ ...prev, modeloContrato: undefined })); 
                      console.log(e.target.files[0]); // Verifica se o arquivo foi selecionado corretamente
                    }} 
                    accept=".pdf,.doc,.docx" 
                  />
                  

                
                </div>
              </div>
            </div>


            <div className="row-form-contrato">
              <div className="form-group-contrato full-width">
                <label>Observação</label>
                <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="2" />
              </div>
            </div>

            <div className='buttons-contrato-form'>
              <div className='botoes-contrato'>
                <button onClick={handleSalvarContrato} className="btn-cadastrar-contrato">
                  {contrato ? 'SALVAR' : 'CADASTRAR'}
                </button>
                <button onClick={onClose} className="btn-cancelar-contrato">
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
