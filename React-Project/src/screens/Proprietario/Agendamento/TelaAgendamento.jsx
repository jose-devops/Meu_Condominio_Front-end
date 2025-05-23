import React, { useState, useEffect } from 'react';

import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaAgendamentos from "./TabelaAgendamentos";
import ModalAgendamento from "./ModalAgendamento";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './estilos.css';


export default function TelaAgendamento() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);

  useEffect(() => {
    const dadosMock = [
 
    ];
    setAgendamentos(dadosMock);
  }, []);

  const agendamentosFiltrados = agendamentos.filter(a =>
    (a.descricao && a.descricao.toLowerCase().includes(busca.toLowerCase())) ||
    (a.tipo && a.tipo.toLowerCase().includes(busca.toLowerCase()))
  );

  function abrirModalParaEditar(agendamento) {
    setAgendamentoSelecionado(agendamento);
    setModalAberto(true);
  }

  function abrirModalNovo() {
    setAgendamentoSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function salvarAgendamento(novoAgendamento) {
    if (agendamentoSelecionado) {
      setAgendamentos(ags =>
        ags.map(a => (a.id === novoAgendamento.id ? novoAgendamento : a))
      );
    } else {
      setAgendamentos(ags => [...ags, { ...novoAgendamento, id: Date.now() }]);
    }
    fecharModal();
  }

  function excluirAgendamento(id) {
    setAgendamentos(ags => ags.filter(a => a.id !== id));
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
    <div className={`tela-agendamento-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal">
        <header className="header">
          <LogoAndNotification />
        </header>
        <main className="conteudo-agendamentos">
          <div className="titulo-container">
            <h2 className="titulo">Agendamentos <span className="calendario-icon">📅</span></h2>
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
          <TabelaAgendamentos
            dados={agendamentosFiltrados}
            onEditar={abrirModalParaEditar}
            onExcluir={excluirAgendamento}
          />
          {modalAberto && (
            <ModalAgendamento
              agendamento={agendamentoSelecionado}
              onClose={fecharModal}
              onSalvar={salvarAgendamento}
            />
          )}
        </main>
      </div>
    </div>
  );
}
  