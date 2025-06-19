import React, { useState, useEffect } from 'react';
import './modal.css';
import { listarStatusImovel, listarMoradores } from '../../../api/Proprietario-Api/ImovelService';
import { buscarProprietarioLogado } from '../../../api/Proprietario-Api/ImovelService';
import { cadastrarImovel } from '../../../api/Proprietario-Api/ImovelService';
import { atualizarImovel } from '../../../api/Proprietario-Api/ImovelService';





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
  const [erros, setErros] = useState({});


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
        setProprietarioNome(data.nome);
        setProprietarioId(data.id); 
      } catch (err) {
        console.error("Erro ao buscar proprietário logado", err);
      }
    }

    carregarProprietario();
  }, []);


const handleSalvarImovel = async (e) => {
  e.preventDefault();


  const errosImovel = {};
  if(!descricao.trim()) errosImovel.descricao = "Preencha a Descrição!";
  if(!morador.trim()) errosImovel.morador = "Preencha o Morador!";
  if(!endereco.trim()) errosImovel.endereco = "Preencha o Endereço!";
  if(!cep.trim()) errosImovel.cep = "Preencha o CEP!";
  if(!cidade.trim()) errosImovel.cidade = "Preencha a Cidade!";
  if(!uf.trim()) errosImovel.uf = "Preencha o UF!";
  if(!bairro.trim()) errosImovel.bairro = "Preencha o Bairro!";
  if(!numero.trim()) errosImovel.numero = "Preencha o Número!";
  if(!complemento.trim()) errosImovel.complemento = "Preencha o Complemento!";
  if(!valorAluguel.trim()) errosImovel.valorAluguel = "Preencha o Valor Aluguel!";
  if(!valorCondominio.trim()) errosImovel.valorCondominio = "Preencha o Valor Condomínio!";
  if(!situacao.trim()) errosImovel.situacao = "Preencha o Status!";

  if (Object.keys(errosImovel).length > 0) {
    setErros(errosImovel);
    return;
  }



  setErros({});
  const token = localStorage.getItem('token');

  const imovelData = {
    id: imovel?.id,
    descricao,
    proprietarioId,
    moradorId: morador ? parseInt(morador) : null,
    endereco,
    cep,
    cidade,
    uf,
    bairro,
    numero,
    complemento,
    valorAluguel: parseFloat(valorAluguel),
    valorCondominio: parseFloat(valorCondominio),
    status: situacao,
    observacao
  };

try {
  if (imovel?.id) {
    // Edição
    await atualizarImovel(imovelData, token);
    onSalvar({ tipo: "sucesso", mensagem: "Imóvel atualizado com sucesso!" });
  } else {
    // Criação
    await cadastrarImovel(imovelData, token);
    onSalvar({ tipo: "sucesso", mensagem: "Imóvel cadastrado com sucesso!" });
  }

} catch (error) {
  console.error('Erro ao salvar o imóvel:', error);
  onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o imóvel." });
}
};












useEffect(() => {
  if (imovel) {
    setDescricao(imovel.descricao || '');
    setMorador(imovel.moradorId?.toString() || ''); 
    setSituacao(imovel.status || '');
    setEndereco(imovel.endereco || '');
    setCep(imovel.cep || '');
    setUf(imovel.uf || '');
    setCidade(imovel.cidade || '');
    setBairro(imovel.bairro || '');
    setNumero(imovel.numero || '');
    setComplemento(imovel.complemento || '');
    setValorAluguel(imovel.valorAluguel?.toString() || '');
    setValorCondominio(imovel.valorCondominio?.toString() || '');
    setObservacao(imovel.observacao || '');
  } else {
    
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
        proprietario: proprietarioId,
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

      <div className="modal-imovel">

        <div className='modal-imovel-area'>
          <div className='modal-imovel-header'>
            <h1>IMOVEL</h1>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>


        <div className="modal-form-imovel">

          <div className='row-form-imovel'>

              <div className="form-group-imovel">
                <label>Descrição</label>
                <input type="text" value={descricao} onChange={e => {setDescricao(e.target.value); setErros(prev => ({ ...prev, descricao: undefined })); }} />
                {erros.descricao && <span className="erro-campo">{erros.descricao}</span>}
              </div>
              

          </div>

          <div className='form-contrato-cols'>

            <div className='col-1-form-imovel'>

              <div className="form-group-imovel">
                <label>Proprietário</label>
                <input
                  type="text"
                  className="form-control"
                  value={proprietarioNome}
                  disabled
                  readOnly
                />
                
              </div>
              {erros.proprietario && <span className="erro-campo">{erros.proprietario}</span>}

              <div className="form-group-imovel">
                  <label>Endereço</label>
                  <input type="text" value={endereco} onChange={e => {setEndereco(e.target.value); setErros(prev => ({ ...prev, endereco: undefined })); }}/>
              </div>
              {erros.endereco && <span className="erro-campo">{erros.endereco}</span>}

              <div className="form-group-imovel">
                <label>Morador</label>
                <select value={morador} onChange={e =>{setMorador(e.target.value); setErros(prev => ({ ...prev, morador: undefined }));} }>
                  <option value="">Selecione...</option>
                  {moradores.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
                {erros.morador && <span className="erro-campo">{erros.morador}</span>}
              </div>

              <div className="form-group-imovel">
                <label>CEP</label>
                <input type="text" value={cep} onChange={e => {setCep(e.target.value); setErros(prev => ({ ...prev, cep: undefined }));} } />
              </div>
              {erros.cep && <span className="erro-campo">{erros.cep}</span>}

              <div className="form-group-imovel">
                <label>Número</label>
                <input type="text" value={numero} onChange={e => {setNumero(e.target.value); setErros(prev => ({ ...prev, numero: undefined })); }} />
              </div>
              {erros.numero && <span className="erro-campo">{erros.numero}</span>}

              <div className="form-group-imovel">
                <label>Valor Aluguel</label>
                <input type="text" value={valorAluguel} onChange={e => {setValorAluguel(e.target.value); setErros(prev => ({ ...prev, valorAluguel: undefined }));} } />
              </div>
              {erros.valorAluguel && <span className="erro-campo">{erros.valorAluguel}</span>}




            </div>

            <div className='col-2-form-imovel'>

              <div className="form-group-imovel">
                <label>Status</label>
                <select
                  value={situacao}
                  onChange={(e) => {setSituacao(e.target.value); setErros(prev => ({ ...prev, situacao: undefined }));} }
                  className="form-control"
                >
                  <option value="">Selecione o status</option>
                  {statusOptions.map((s, index) => (
                    <option key={index} value={s}>{s}</option>
                  ))}
                </select>
                {erros.situacao && <span className="erro-campo">{erros.situacao}</span>}
              </div>


              
              <div className="form-group-imovel">
                <label>UF</label>
                <input type="text" value={uf} onChange={e => {setUf(e.target.value); setErros(prev => ({ ...prev, uf: undefined })); }}/>
              </div>
              {erros.uf && <span className="erro-campo">{erros.uf}</span>}


              <div className="form-group-imovel">
                <label>Bairro</label>
                <input type="text" value={bairro} onChange={e => {setBairro(e.target.value); setErros(prev => ({ ...prev, bairro: undefined }));} } />
              </div>
              {erros.bairro && <span className="erro-campo">{erros.bairro}</span>}


              <div className="form-group-imovel">
                <label>Cidade</label>
                <input type="text" value={cidade} onChange={e =>{setCidade(e.target.value); setErros(prev => ({ ...prev, cidade: undefined }));} } />
              </div>
              {erros.cidade && <span className="erro-campo">{erros.cidade}</span>}


              <div className="form-group-imovel">
                  <label>Complemento</label>
                  <input type="text" value={complemento} onChange={e => {setComplemento(e.target.value); setErros(prev => ({ ...prev, complemento: undefined }));} } />
              </div>
              {erros.complemento && <span className="erro-campo">{erros.complemento}</span>}


                            
              <div className="form-group-imovel">
                <label>Valor condomínio</label>
                <input type="text" value={valorCondominio} onChange={e => {setValorCondominio(e.target.value); setErros(prev => ({ ...prev, valorCondominio: undefined }));  } } />
              </div>
              {erros.valorCondominio && <span className="erro-campo">{erros.valorCondominio}</span>}

            </div>
              
          </div>

          <div className='row-form-imovel'>
            
            <div className="form-group-imovel">
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
                <button onClick={handleSalvarImovel} className="btn-cadastrar-imovel">
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
