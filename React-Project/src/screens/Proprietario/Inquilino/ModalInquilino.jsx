import React, { useState, useEffect } from 'react';
import './modal.css';
import { cadastrarMorador, editarInquilino } from '../../../api/Proprietario-Api/MoradorService';


export default function ModalInquilino({ inquilino, onClose, onSalvar, token }) {
  const [nome, setNome] = useState(inquilino?.nome || '');
  const [cpf, setCpf] = useState(inquilino?.cpf || '');
  const [dataAniversario, setDataAniversario] = useState(inquilino?.dataAniversario || '');
  const [rendaMensal, setRendaMensal] = useState(inquilino?.rendaMensal || '');
  const [telefonePrincipal, setTelefonePrincipal] = useState(inquilino?.telefonePrincipal || '');
  const [telefoneSecundario, setTelefoneSecundario] = useState(inquilino?.telefoneSecundario || '');
  const [ativo, setAtivo] = useState(inquilino?.ativo || true);  // Correção aqui
  const [idProprietario, setIdProprietario] = useState(inquilino?.idProprietario || getProprietarioIdFromToken(token));

  const [profissao, setProfissao] = useState(inquilino?.profissao || '');
  const [email, setEmail] = useState(inquilino?.email || '');
  const [senha, setSenha] = useState(inquilino?.senha || '');
  const [observacao, setObservacao] = useState(inquilino?.observacao || '');

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

  const proprietarioId = getProprietarioIdFromToken(token);

  useEffect(() => {
    if (!inquilino) return;
 


    setNome(inquilino.nome || '');
    setCpf(inquilino.cpf || '');
    setDataAniversario(inquilino.dataAniversario || '');
    setRendaMensal(inquilino.rendaMensal?.toString() || '');
    setTelefonePrincipal(inquilino.telefonePrincipal || '');
    setTelefoneSecundario(inquilino.telefoneSecundario || '');
    setProfissao(inquilino.profissao || '');
    setEmail(inquilino.usuarioEmail || '');
    setSenha(inquilino.usuarioSenha || '');
    setObservacao(inquilino.observacao || '');
    setAtivo(inquilino.ativo !== undefined ? inquilino.ativo : true); 

  }, [inquilino]);

  const handleSalvarInquilino = async () => {
    const novosErros = {};

    // Validação de campos obrigatórios
    if (!nome.trim()) novosErros.nome = "Nome é obrigatório.";
    if (!cpf.trim()) novosErros.cpf = "CPF é obrigatório.";
    if (!email.trim()) novosErros.email = "Email é obrigatório.";
    
    if (!telefonePrincipal.trim()) novosErros.telefonePrincipal = "Telefone principal é obrigatório.";
    if (!rendaMensal.trim()) novosErros.rendaMensal = "Renda mensal é obrigatória.";

  

    // Se houver erros, exibimos e paramos o processo
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    // Limpar erros
    setErros({});

    // Estruturar os dados para envio
    const dadosInquilino = {
     
      id: inquilino?.id, 
      nome,
      ativo, // Assumindo que ativo é uma opção booleana
      cpf,
      dataAniversario,
      email,
      ...(senha && { senha }),
      rendaMensal,
      profissao,
      observacao,
      telefonePrincipal,
      telefoneSecundario,
      idProprietario,
    };

    try {
      // Se o inquilino já existe, atualiza
      if (inquilino) {
        await editarInquilino(inquilino.id, dadosInquilino);
        onSalvar({ tipo: "sucesso", mensagem: "Inquilino atualizado com sucesso!" });
      } else {
        // Caso contrário, cria um novo
        await cadastrarMorador(dadosInquilino, token);  // Função de cadastrar inquilino
        onSalvar({ tipo: "sucesso", mensagem: "Inquilino cadastrado com sucesso!" });
      }
    } catch (error) {
      console.error(error);
      onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o inquilino." });
    }
  };


  return (
    <div className="modal-fundo" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-inquilino">
        <div className='modal-inquilino-area'>
          <div className='modal-inquilino-header'>
            <h1>MORADOR</h1>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="modal-form-inquilino">

            <div className='form-inquilino-cols'>

              <div className='col-1-form-inquilino'>

                <div className="form-group-inquilino">
                  <label>Nome</label>
                  <input 
                    type="text" 
                    value={nome} 
                    onChange={e => {
                      setNome(e.target.value); 
                      setErros(prev => ({ ...prev, nome: undefined }));
                    }} 
                  />
                  {erros.nome && <div className="campo-erro">{erros.nome}</div>}
                </div>

                <div className="form-group-inquilino-tipo-radio">
                  <label className='desc-raddio'>
                    <span>Status:</span>
                  </label>
                  <div className="radio-options-inquilino">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="tipoContrato" 
                        value="1" 
                        checked={ativo === true}
                        onChange={() => setAtivo(true)}
                      />
                      Ativo
                    </label>

                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="tipoContrato" 
                        value="0" 
                        checked={ativo === false}
                        onChange={() => setAtivo(false)} 
                      />
                      Inativo
                    </label>
                    {erros.status && <div className="campo-erro">{erros.status}</div>}

                  </div>

                </div>

                <div className="form-group-inquilino">
                  <label>Data aniversário</label>
                  <input 
                    type="date" 
                    value={dataAniversario} 
                    onChange={e => setDataAniversario(e.target.value)} 
                  />
                </div>

                <div className="form-group-inquilino">
                  <label>Renda mensal</label>
                  <input 
                    type="text" 
                    value={rendaMensal} 
                    onChange={e => setRendaMensal(e.target.value)} 
                  />
                </div>

                <div className="form-group-inquilino">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                  />
                </div>
                {erros.email && <div className="campo-erro">{erros.email}</div>}

              </div>

              <div className='col-2-form-inquilino'>
                <div className="form-group-inquilino">
                  <label>CPF</label>
                  <input 
                    type="text" 
                    value={cpf} 
                    onChange={e => {
                      setCpf(e.target.value); 
                      setErros(prev => ({ ...prev, cpf: undefined }));
                    }} 
                  />
                  {erros.cpf && <div className="campo-erro">{erros.cpf}</div>}
                </div>

                <div className="form-group-inquilino">
                  <label>Telefone Principal</label>
                  <input 
                    type="text" 
                    value={telefonePrincipal} 
                    onChange={e => {
                      setTelefonePrincipal(e.target.value); 
                      setErros(prev => ({ ...prev, telefonePrincipal: undefined }));
                    }} 
                  />
                  {erros.telefonePrincipal && <div className="campo-erro">{erros.telefone}</div>}
                </div>

                <div className="form-group-inquilino">
                  <label>Telefone Secundario</label>
                  <input 
                    type="text" 
                    value={telefoneSecundario} 
                    onChange={e => {
                      setTelefoneSecundario(e.target.value); 
                      setErros(prev => ({ ...prev, telefoneSecundario: undefined }));
                    }} 
                  />
                  {erros.telefoneSecundario && <div className="campo-erro">{erros.telefoneSecundario}</div>}
                </div>

                <div className="form-group-inquilino">
                  <label>Profissão</label>
                  <input 
                    type="text" 
                    value={profissao} 
                    onChange={e => {
                      setProfissao(e.target.value); 
                      setErros(prev => ({ ...prev, profissao: undefined }));
                    }} 
                  />
                  {erros.profissao && <div className="campo-erro">{erros.profissao}</div>}
                </div>

                <div className="form-group-inquilino">
                  <label>Senha</label>
                  <input 
                    type="password" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)}
                    

                  />
                </div>
             


              </div>
            </div>

            <div className="row-form-inquilino">
              <div className="form-group-inquilino full-width">
                <label>Observação</label>
                <textarea 
                  value={observacao} 
                  onChange={(e) => setObservacao(e.target.value)} 
                  rows="3" 
                />
              </div>
            </div>

            <div className='buttons-inquilino-form'>
              <div className='botoes-inquilino'>
                <button onClick={handleSalvarInquilino} className="btn-cadastrar-inquilino">
                  {inquilino ? 'SALVAR' : 'CADASTRAR'}
                </button>
                <button onClick={onClose} className="btn-cancelar-inquilino">
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

