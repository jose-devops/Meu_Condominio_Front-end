import React, { useState, useEffect } from 'react';

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

  function excluirContrato(id) {
    setContratos(cts => cts.filter(c => c.id !== id));
  }

  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

  function atualizarDados() {
    // Função para atualizar os dados (simulação)
    console.log("Atualizando dados...");
    // Aqui poderia ter uma chamada à API
  }

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
            onEditar={abrirModalParaEditar}
            onExcluir={excluirContrato}
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
      </div>
    </div>
  );
}
