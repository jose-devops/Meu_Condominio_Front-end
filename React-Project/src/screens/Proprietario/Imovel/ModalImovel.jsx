import React, { useState, useEffect } from 'react';
import './modal.css';
import { listarStatusImovel, listarMoradores } from '../../../api/Proprietario-Api/ImovelService';
import { buscarProprietarioLogado } from '../../../api/Proprietario-Api/ImovelService';





export default function ModalImovel({ imovel, onClose, onSalvar }) {
  const [descricao, setDescricao] = useState('');

  const [morador, setMorador] = useState('');
  const [situacao, setSituacao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [valorAluguel, setValorAluguel] = useState('');
  const [valorCondominio, setValorCondominio] = useState('');
  const [observacao, setObservacao] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [moradores, setMoradores] = useState([]);
  const [proprietarioId, setProprietarioId] = useState('');
  const [proprietarioNome, setProprietarioNome] = useState('');





  useEffect(() => {
    const carregarStatus = async () => {
      try {
        const data = await listarStatusImovel();
        setStatusOptions(data);
      } catch (error) {
        console.error("Erro ao carregar status:", error);
      }
    };

    carregarStatus();
  }, []);


  useEffect(() => {
    const carregarMoradores = async () => {
      try {
        const data = await listarMoradores();
        setMoradores(data);
      } catch (error) {
        console.error("Erro ao carregar moradores:", error);
      }
    };

    carregarMoradores();
  }, []);


useEffect(() => {
  async function carregarProprietario() {
    try {
      const data = await buscarProprietarioLogado();
      setProprietarioNome(data.nome); // ← agora vem do backend
    } catch (err) {
      console.error("Erro ao buscar proprietário logado", err);
    }
  }

  carregarProprietario();
}, []);







useEffect(() => {
  if (imovel) {
    setDescricao(imovel.descrição || '');
    setMorador(imovel.morador || '');
    setSituacao(imovel.situacao || '');
    setEndereco(imovel.endereco || '');
    setCep(imovel.cep || '');
    setUf(imovel.uf || '');
    setCidade(imovel.cidade || '');
    setBairro(imovel.bairro || '');
    setNumero(imovel.numero || '');
    setComplemento(imovel.complemento || '');
    setValorAluguel(imovel.valorAluguel || '');
    setValorCondominio(imovel.valorCondominio || '');
    setObservacao(imovel.observacao || '');
  } else {
    // Limpa os campos ao abrir no modo de criação
    setDescricao('');
    setMorador('');
    setSituacao('');
    setEndereco('');
    setCep('');
    setUf('');
    setCidade('');
    setBairro('');
    setNumero('');
    setComplemento('');
    setValorAluguel('');
    setValorCondominio('');
    setObservacao('');
   
  }
}, [imovel]);

    function salvar() {
      const novoImovel = {
        id: imovel?.id || Date.now(),
        descricao,
        proprietario: proprietarioId, // <== ID do proprietário logado
        morador,
        situacao,
        endereco,
        cep,
        uf,
        cidade,
        bairro,
        numero,
        complemento,
        valorAluguel,
        valorCondominio,
        observacao
      };
      onSalvar(novoImovel);
    }

  return (
    <div className="modal-fundo" onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="modal-conteudo">

        <h3>IMÓVEL</h3>

        <div className="modal-form">


          <div className="form-row-morador">
            <div className="form-group">
              <label>Descrição</label>
              <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} />
            </div>

          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Proprietário</label>
              <input
                type="text"
                className="form-control"
                value={proprietarioNome}
                disabled
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Endereço</label>
              <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Morador</label>
              <select value={morador} onChange={e => setMorador(e.target.value)}>
                <option value="">Selecione...</option>
                {moradores.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>CEP</label>
              <input type="text" value={cep} onChange={e => setCep(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
                className="form-control"
              >
                <option value="">Selecione o status</option>
                {statusOptions.map((s, index) => (
                  <option key={index} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>UF</label>
              <input type="text" value={uf} onChange={e => setUf(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bairro</label>
              <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Cidade</label>
              <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Número</label>
              <input type="text" value={numero} onChange={e => setNumero(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Complemento</label>
              <input type="text" value={complemento} onChange={e => setComplemento(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valor Aluguel</label>
              <input type="text" value={valorAluguel} onChange={e => setValorAluguel(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Valor condomínio</label>
              <input type="text" value={valorCondominio} onChange={e => setValorCondominio(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Observação</label>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows="4"
              />
            </div>

          </div>

          <div className='buttons-imovel-form'>
            <div className="botoes-imovel">
                <button
                  //onClick={handleSalvarImovel}
                  className="btn-cadastrar-imovel"
                >
                  {imovel ? 'SALVAR' : 'CADASTRAR'}
                </button>
                <button onClick={onClose} className="btn-cancelar-imovel">
                  CANCELAR
                </button>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}
