import React, { useState, useEffect } from 'react';
import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaImoveis from "./TabelaImoveis";
import ModalImovel from "./ModalImovel";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './EstiloImovel.css';

export default function TelaImovel() {
  const [imoveis, setImoveis] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);


  const imoveisFiltrados = imoveis.filter(i =>
    (i.proprietario && i.proprietario.toLowerCase().includes(busca.toLowerCase())) ||
    (i.inquilino && i.inquilino.toLowerCase().includes(busca.toLowerCase())) ||
    (i.endereco && i.endereco.toLowerCase().includes(busca.toLowerCase())) ||
    (i.cidade && i.cidade.toLowerCase().includes(busca.toLowerCase())) ||
    (i.bairro && i.bairro.toLowerCase().includes(busca.toLowerCase())) ||
    (i.situacao && i.situacao.toLowerCase().includes(busca.toLowerCase()))
  );

  function abrirModalParaEditar(imovel) {
    setImovelSelecionado(imovel);
    setModalAberto(true);
  }

  function abrirModalNovo() {
    setImovelSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function salvarImovel(novoImovel) {
    if (imovelSelecionado) {
      setImoveis(imvs => imvs.map(i => (i.id === novoImovel.id ? novoImovel : i)));
    } else {
      setImoveis(imvs => [...imvs, { ...novoImovel, id: Date.now() }]);
    }
    fecharModal();
  }

  function excluirImovel(id) {
    setImoveis(imvs => imvs.filter(i => i.id !== id));
  }

  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

  function atualizarDados() {
    console.log("Atualizando dados...");
  }

  return (
    <div className={`tela-imoveis-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal">
        <header className="header">
          <LogoAndNotification />
        </header>
        <main className="conteudo-imoveis">
          <div className="titulo-container">
            <h2 className="titulo">Imóveis</h2>
          </div>
          <div className="controles-container">
            <div className="busca-container">
              <CampoBusca
                placeholder="Buscar imóvel..."
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
              <BotaoNovo onClick={abrirModalNovo} texto="NOVO" />
            </div>
          </div>
          <TabelaImoveis
            dados={imoveisFiltrados}
            onEditar={abrirModalParaEditar}
            onExcluir={excluirImovel}
          />
        </main>
      </div>

      {/* Renderiza o modal corretamente */}
      {modalAberto && (
        <ModalImovel
          imovel={imovelSelecionado}
          onClose={fecharModal}
          onSalvar={salvarImovel}
        />
      )}
    </div>
  );
}
