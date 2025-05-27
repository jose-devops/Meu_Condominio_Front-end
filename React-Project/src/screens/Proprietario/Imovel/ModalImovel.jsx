import React, { useState, useEffect } from 'react';
import './modal.css';

export default function ModalImovel({ imovel, onClose, onSalvar }) {
  const [proprietario, setProprietario] = useState('');
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

  useEffect(() => {
    if (imovel) {
      setProprietario(imovel.proprietario || '');
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
    }
  }, [imovel]);

  function salvar() {
    const novoImovel = {
      id: imovel?.id || Date.now(),
      proprietario, morador, situacao,
      endereco, cep, uf, cidade, bairro,
      numero, complemento, valorAluguel, valorCondominio
    };
    onSalvar(novoImovel);
  }

  return (
    <div className="modal-fundo" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-conteudo">
        <h3>IMÓVEL</h3>
        <div className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Proprietário</label>
              <select value={proprietario} onChange={e => setProprietario(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Ezequiel Mulina">Ezequiel Mulina</option>
              </select>
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
              </select>
            </div>
            <div className="form-group">
              <label>CEP</label>
              <input type="text" value={cep} onChange={e => setCep(e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Situação</label>
              <select value={situacao} onChange={e => setSituacao(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="Alugado">Alugado</option>
                <option value="Disponível">Disponível</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Vendido">Vendido</option>
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

          <div className="botoes">
            <button onClick={salvar} className="btn-cadastrar">CADASTRAR</button>
            <button onClick={onClose} className="btn-cancelar">CANCELAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
