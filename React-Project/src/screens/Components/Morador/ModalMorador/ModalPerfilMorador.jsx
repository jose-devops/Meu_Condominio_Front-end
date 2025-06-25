import React, { useState, useEffect } from 'react';
import './ModalPerfilMorador.css';

export default function ModalPerfilMorador({ prestador, onClose, onSalvar, token }) {
  const [nome, setNome] = useState(prestador?.nome || '');
  const [cpf, setCpf] = useState(prestador?.cpf || '');
  const [dataAniversario, setDataAniversario] = useState(prestador?.dataAniversario || '');
  const [rendaMensal, setRendaMensal] = useState(prestador?.rendaMensal || '');
  const [telefonePrincipal, setTelefonePrincipal] = useState(prestador?.telefonePrincipal || '');
  const [telefoneSecundario, setTelefoneSecundario] = useState(prestador?.telefoneSecundario || '');
  const [ativo, setAtivo] = useState(prestador?.ativo ?? true);
  const [idProprietario, setIdProprietario] = useState(prestador?.idProprietario || getProprietarioIdFromToken(token));
  const [profissao, setProfissao] = useState(prestador?.profissao || '');
  const [email, setEmail] = useState(prestador?.email || '');
  const [senha, setSenha] = useState(prestador?.senha || '');
  const [observacao, setObservacao] = useState(prestador?.observacao || '');
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
    if (!prestador) return;
    setNome(prestador.nome || '');
    setCpf(prestador.cpf || '');
    setDataAniversario(prestador.dataAniversario || '');
    setRendaMensal(prestador.rendaMensal?.toString() || '');
    setTelefonePrincipal(prestador.telefonePrincipal || '');
    setTelefoneSecundario(prestador.telefoneSecundario || '');
    setProfissao(prestador.profissao || '');
    setEmail(prestador.email || '');
    setSenha(prestador.senha || '');
    setObservacao(prestador.observacao || '');
    setAtivo(prestador.ativo ?? true);
  }, [prestador]);

  const handleSalvarPrestador = async () => {
    const novosErros = {};
    if (!nome.trim()) novosErros.nome = "Nome é obrigatório.";
    if (!cpf.trim()) novosErros.cpf = "CPF é obrigatório.";
    if (!email.trim()) novosErros.email = "Email é obrigatório.";
    if (!telefonePrincipal.trim()) novosErros.telefonePrincipal = "Telefone principal é obrigatório.";
    if (!rendaMensal.trim()) novosErros.rendaMensal = "Renda mensal é obrigatória.";
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }
    setErros({});
    const dadosPrestador = {
      id: prestador?.id,
      nome,
      ativo,
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
      if (prestador) {
        await editarPrestador(prestador.id, dadosPrestador);
        onSalvar({ tipo: "sucesso", mensagem: "Prestador atualizado com sucesso!" });
      } else {
        await cadastrarPrestador(dadosPrestador, token);
        onSalvar({ tipo: "sucesso", mensagem: "Prestador cadastrado com sucesso!" });
      }
    } catch (error) {
      console.error(error);
      onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o prestador." });
    }
  };

  return (
    <div className="modal-fundo-prestador" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-prestador">
        <div className="modal-prestador-area">
          <div className="modal-prestador-header">
            <h1>PRESTADOR</h1>
            <button className="close-button-prestador" onClick={onClose}>×</button>
          </div>
          <div className="modal-form-prestador">
            <div className="form-prestador-cols">
              <div className="col-1-form-prestador">
                {/* Campos coluna 1 */}
                <div className="form-group-prestador">
                  <label>Nome</label>
                  <input type="text" value={nome} onChange={e => { setNome(e.target.value); setErros(prev => ({ ...prev, nome: undefined })); }} />
                  {erros.nome && <div className="campo-erro-prestador">{erros.nome}</div>}
                </div>
                <div className="form-group-prestador-tipo-radio">
                  <label>Status:</label>
                  <div className="radio-options-prestador">
                    <label>
                      <input type="radio" checked={ativo === true} onChange={() => setAtivo(true)} /> Ativo
                    </label>
                    <label>
                      <input type="radio" checked={ativo === false} onChange={() => setAtivo(false)} /> Inativo
                    </label>
                  </div>
                </div>
                <div className="form-group-prestador">
                  <label>Data Aniversário</label>
                  <input type="date" value={dataAniversario} onChange={e => setDataAniversario(e.target.value)} />
                </div>
                <div className="form-group-prestador">
                  <label>Renda Mensal</label>
                  <input type="text" value={rendaMensal} onChange={e => setRendaMensal(e.target.value)} />
                </div>
                <div className="form-group-prestador">
                  <label>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  {erros.email && <div className="campo-erro-prestador">{erros.email}</div>}
                </div>
              </div>
              <div className="col-2-form-prestador">
                {/* Campos coluna 2 */}
                <div className="form-group-prestador">
                  <label>CPF</label>
                  <input type="text" value={cpf} onChange={e => { setCpf(e.target.value); setErros(prev => ({ ...prev, cpf: undefined })); }} />
                  {erros.cpf && <div className="campo-erro-prestador">{erros.cpf}</div>}
                </div>
                <div className="form-group-prestador">
                  <label>Telefone Principal</label>
                  <input type="text" value={telefonePrincipal} onChange={e => { setTelefonePrincipal(e.target.value); setErros(prev => ({ ...prev, telefonePrincipal: undefined })); }} />
                  {erros.telefonePrincipal && <div className="campo-erro-prestador">{erros.telefonePrincipal}</div>}
                </div>
                <div className="form-group-prestador">
                  <label>Telefone Secundário</label>
                  <input type="text" value={telefoneSecundario} onChange={e => { setTelefoneSecundario(e.target.value); setErros(prev => ({ ...prev, telefoneSecundario: undefined })); }} />
                  {erros.telefoneSecundario && <div className="campo-erro-prestador">{erros.telefoneSecundario}</div>}
                </div>
                <div className="form-group-prestador">
                  <label>Profissão</label>
                  <input type="text" value={profissao} onChange={e => { setProfissao(e.target.value); setErros(prev => ({ ...prev, profissao: undefined })); }} />
                  {erros.profissao && <div className="campo-erro-prestador">{erros.profissao}</div>}
                </div>
                <div className="form-group-prestador">
                  <label>Senha</label>
                  <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="row-form-prestador">
              <div className="form-group-prestador full-width">
                <label>Observação</label>
                <textarea value={observacao} onChange={e => setObservacao(e.target.value)} rows="3" />
              </div>
            </div>
            <div className="buttons-prestador-form">
              <div className="botoes-prestador">
                <button onClick={handleSalvarPrestador} className="btn-cadastrar-prestador">{prestador ? 'SALVAR' : 'CADASTRAR'}</button>
                <button onClick={onClose} className="btn-cancelar-prestador">CANCELAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  );
}
