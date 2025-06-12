import React, { useState, useEffect } from 'react';
import { listarContratos } from '../../../api/Proprietario-Api/ContratoService'; // ajuste o caminho conforme sua pasta
import { excluirContrato as deletarContratoProprietario } from '../../../api/Proprietario-Api/ContratoService';



import ConfirmDialog from '../../Components/ConfirmDialog';
import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaContratos from "./TabelaContratos";
import ModalContrato from "./ModalContrato";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './estilos.css';

export default function TelaContratos({ token }) {  
  const [contratos, setContratos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);
  const [toastMensagem, setToastMensagem] = useState('');


  const contratosFiltrados = contratos.filter(c =>
    (c.imovel && c.imovel.toLowerCase().includes(busca.toLowerCase())) ||
    (c.inquilino && c.inquilino.toLowerCase().includes(busca.toLowerCase())) ||
    (c.status && c.status.toLowerCase().includes(busca.toLowerCase()))
  );

  function abrirModalParaEditar(contrato) {
    setContratoSelecionado(contrato);
    setModalAberto(true);
  }

  function abrirModalNovo() {
    setContratoSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function abrirConfirmacaoExclusao(id) {
    setIdExcluir(id);
    setModalConfirmOpen(true);
  }

  function cancelarExclusao() {
    setModalConfirmOpen(false);
    setIdExcluir(null);
  }

  function salvarContrato(novoContrato) {
    if (contratoSelecionado) {
      setContratos(cts =>
        cts.map(c => (c.id === novoContrato.id ? novoContrato : c))
      );
    } else {
      setContratos(cts => [...cts, { ...novoContrato, id: Date.now() }]);
    }
    fecharModal();
  }

  async function excluirContrato(id) {
    try {
      const token = localStorage.getItem('token');
      await deletarContratoProprietario(id, token);
      setContratos(ags => ags.filter(a => a.id !== id));
      setToastMensagem("Contrato excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      setToastMensagem("Erro ao excluir contrato.");
    }
  }


  
async function confirmarExclusao() {
  if (idExcluir !== null) {
    try {
      const token = localStorage.getItem('token');
      await deletarContratoProprietario(idExcluir, token); // função da API
      setContratos(contratos => contratos.filter(c => c.id !== idExcluir));
      setToastMensagem('Contrato excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      setToastMensagem('Erro ao excluir contrato.');
    } finally {
      setModalConfirmOpen(false);
      setIdExcluir(null);
      setTimeout(() => setToastMensagem(''), 3000);
    }
  }
}

  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

function atualizarDados() {
  listarContratos()
    .then(setContratos)
    .catch((erro) => console.error("Erro ao atualizar contratos:", erro));
}


  useEffect(() => {
  async function carregarContratos() {
    try {
      const resultado = await listarContratos();
      setContratos(resultado);
    } catch (erro) {
      console.error("Erro ao listar contratos:", erro);
    }
  }

  carregarContratos();
}, []);

  return (
    <div className={`tela-contratos-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal">
        <header className="header">
          <LogoAndNotification />
        </header>
        <main className="conteudo-contratos">
          <div className="titulo-container">
            <h2 className="titulo">Contratos <span className="contratos-icon">📄</span></h2>
          </div>
          <div className="controles-container">
            <div className="busca-container">
              <CampoBusca 
                placeholder="Faça sua busca..." 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)} 
              />
            </div>
            <div className="botoes-container">
              <button className="botao-atualizar" onClick={atualizarDados} title="Atualizar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
              </button>
              <BotaoNovo onClick={abrirModalNovo} />
            </div>
          </div>
          <TabelaContratos
            dados={contratosFiltrados}
            contratos={contratos}
            onEditar={abrirModalParaEditar}
            onExcluir={abrirConfirmacaoExclusao}

          />
          {modalAberto && (
            <ModalContrato
              contrato={contratoSelecionado}
              token={token} 
              onClose={fecharModal}
              onSalvar={salvarContrato}
            />
          )}
        </main>


        {modalConfirmOpen && (
          <ConfirmDialog
            mensagem={`Tem certeza que deseja excluir o contrato de ID: ${idExcluir}?`}
            onConfirm={confirmarExclusao}
            onCancel={cancelarExclusao}
          />
        )}
      </div>


      {toastMensagem && (
        <div className="toast-contrato">
          <div className="toast-sucesso-barra-lateral"></div>
          <div className="toast-sucesso-conteudo-contrato">
            <div className="text-toats">
              <span className="toast-texto">{toastMensagem}</span>
            </div>
          </div>
          <span className="toast-fechar" onClick={() => setToastMensagem('')}>
            ×
          </span>
        </div>
      )}
    </div>
  );
}
