import React, { useState, useEffect } from 'react';
import './modal.css';

export default function ModalInquilino({ inquilino, onClose, onSalvar, token }) {
  const [nome, setNome] = useState(inquilino?.nome || '');
  const [cpf, setCpf] = useState(inquilino?.cpf || '');
  const [dataAniversario, setDataAniversario] = useState(inquilino?.dataAniversario || '');
  const [rendaMensal, setRendaMensal] = useState(inquilino?.rendaMensal || '');
  const [telefone, setTelefone] = useState(inquilino?.telefone || '');
  const [profissao, setProfissao] = useState(inquilino?.profissao || '');
  const [email, setEmail] = useState(inquilino?.email || '');
  const [senha, setSenha] = useState(inquilino?.senha || '');
  const [observacao, setObservacao] = useState(inquilino?.observacao || '');

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (!inquilino) return;

    setNome(inquilino.nome || '');
    setCpf(inquilino.cpf || '');
    setDataAniversario(inquilino.dataAniversario || '');
    setRendaMensal(inquilino.rendaMensal?.toString() || '');
    setTelefone(inquilino.telefone || '');
    setProfissao(inquilino.profissao || '');
    setEmail(inquilino.email || '');
    setSenha(inquilino.senha || '');
    setObservacao(inquilino.observacao || '');
  }, [inquilino]);

  const handleSalvarInquilino = async (e) => {
    e.preventDefault();

    const inquilinoErros = {};
    if (!nome) inquilinoErros.nome = "Preencha o nome";
    if (!cpf) inquilinoErros.cpf = "Preencha o CPF";
    if (!telefone) inquilinoErros.telefone = "Preencha o telefone";
    if (!profissao) inquilinoErros.profissao = "Preencha a profissão";

    setErros(inquilinoErros);

    if (Object.keys(inquilinoErros).length > 0) {
      return;
    }

    const inquilinoData = {
      id: inquilino?.id || null,
      nome,
      cpf,
      dataAniversario: dataAniversario || undefined,
      rendaMensal: rendaMensal ? Number(rendaMensal) : undefined,
      telefone,
      profissao,
      email: email || undefined,
      senha: senha || undefined,
      observacao: observacao || undefined,
    };

    try {
      // Aqui você pode adicionar a chamada para a API quando estiver disponível
      if (inquilino?.id) {
        // Edição
        // await alterarInquilino(inquilino.id, inquilinoData);
        onSalvar({ tipo: "sucesso", mensagem: "Inquilino atualizado com sucesso!" });
      } else {
        // Criação
        // await cadastrarInquilino(inquilinoData);
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
                  <label>Telefone</label>
                  <input 
                    type="text" 
                    value={telefone} 
                    onChange={e => {
                      setTelefone(e.target.value); 
                      setErros(prev => ({ ...prev, telefone: undefined }));
                    }} 
                  />
                  {erros.telefone && <div className="campo-erro">{erros.telefone}</div>}
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

