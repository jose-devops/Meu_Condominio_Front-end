import React, { useState, useEffect } from 'react';
import './modal.css';
import {listarImoveis, listarMoradores, listarStatusContrato, cadastrarContrato}  from '../../../api/Proprietario-Api/ContratoService';

import axios from 'axios';


export default function ModalContrato({ contrato, onClose, onSalvar, token }) {



  const [imoveis, setImoveis] = useState([]);
  const [moradores, setMoradores] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);



  const [imovel, setImovel] = useState(contrato?.imovel || '');

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
    // Carregar imóveis e moradores do backend
    async function fetchData() {
      try {
        const imoveisData = await listarImoveis(); // Chama a função para listar imóveis
        setImoveis(imoveisData); // Atualiza o estado com os imóveis
        const moradoresData = await listarMoradores(); // Chama a função para listar moradores
        setMoradores(moradoresData); // Atualiza o estado com os moradores
        const statusData = await listarStatusContrato();
        setStatusOptions(statusData);
      } catch (error) {
        console.error("Erro ao carregar imóveis ou moradores", error);
      }
    }

    fetchData(); // Carrega os dados ao montar o componente
  }, [contrato]); // Rodar apenas uma vez quando o componente for montado


// ModalContrato.jsx
const handleSalvarContrato = async (e) => {
  e.preventDefault();

  // Verifica campos obrigatórios
  if (!imovel || !morador || !dataAssinatura) {
    alert("Preencha os campos obrigatórios: Imóvel, Morador e Data de Assinatura");
    return;
  }

  // Cria objeto exatamente como foi preenchido
  const contratoData = {
    imovelId: imovel,
    moradorId: morador,
    dataDespejo: dataDespejo || undefined,
    valorMulta: valorMulta ? Number(valorMulta) : undefined,
    valorAluguel: valorAluguel ? Number(valorAluguel) : undefined,
    status: status || undefined, // Envia undefined se vazio
    tipoContrato: tipoContrato.toUpperCase(),
    observacao: observacao || undefined,
    dataAssinatura,
    dataInicioVigencia: dataPosse || undefined,
    dataFimVigencia: dataDespejo
  };

  console.log('Dados brutos do formulário:', contratoData);

  try {
    const response = await cadastrarContrato(contratoData, modeloContrato);
    console.log('Resposta do backend:', response);
    onClose();
  } catch (error) {
    console.error('Erro completo:', {
      request: error.config,
      response: error.response
    });
    alert(`Erro: ${error.response?.data?.message || error.message}`);
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
                        onChange={e => setTipoContrato(e.target.value)} 
                      />
                      Aluguel
                    </label>
                  </div>
                </div>

                <div className="form-group-contrato">
                  <label>Morador</label>
                  <select value={morador} onChange={e => setMorador(e.target.value)}>
                    <option value="">Selecione...</option>
                    {moradores.map((morador) => (
                      <option key={morador.id} value={morador.id}>
                        {morador.nome} {/* Exibindo o nome do morador */}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-contrato">
                  <label>Data posse</label>
                  <input type="date" value={dataPosse} onChange={e => setDataPosse(e.target.value)} />
                </div>

                <div className="form-group-contrato">
                  <label>Valor multa</label>
                  <input type="text" value={valorMulta} onChange={e => setValorMulta(e.target.value)} />
                </div>

                <div className="form-group-contrato">
                  <label>Data assinatura</label>
                  <input type="date" value={dataAssinatura} onChange={e => setDataAssinatura(e.target.value)} />
                </div>
              </div>

              <div className='col-2-form-contrato'>
                <div className="form-group-contrato">
                  <label>Imóvel</label>
                  <select value={imovel} onChange={e => setImovel(e.target.value)}>
                    <option value="">Selecione...</option>
                    {imoveis.map((imovel) => (
                      <option key={imovel.id} value={imovel.id}>
                        {imovel.descricao} {/* Exibindo a descrição do imóvel */}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-contrato">
                  <label>Status</label>
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">Selecione...</option>
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group-contrato">
                  <label>Data despejo</label>
                  <input type="date" value={dataDespejo} onChange={e => setDataDespejo(e.target.value)} />
                </div>

                <div className="form-group-contrato">
                  <label>Valor aluguel</label>
                  <input type="text" value={valorAluguel} onChange={e => setValorAluguel(e.target.value)} />
                </div>

                <div className="form-group-contrato">
                  <label>Modelo contrato</label>
                  <input 
                    type="file" 
                    onChange={(e) => {
                      setModeloContrato(e.target.files[0]);
                      console.log("Arquivo selecionado:", e.target.files[0]); 

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
