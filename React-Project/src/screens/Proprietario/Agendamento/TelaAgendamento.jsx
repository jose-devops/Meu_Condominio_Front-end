import { listarAgendamentosProprietario } from '../../../api/Proprietario-Api/AgendamentoService';
import { deletarAgendamentoProprietario } from '../../../api/Proprietario-Api/AgendamentoService';
import ConfirmDialog from '../../Components/ConfirmDialog';
import React, { useState, useEffect } from 'react';
import TabelaAgendamentos from "./TabelaAgendamentos";
import ModalAgendamento from "./ModalAgendamento";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './TelaAgendamento.css';
import CampoBuscaAgendamentos from '../../Components/Agendamentos/CampoBuscaAgendamentos';






function getProprietarioIdFromToken(token) {
  if (!token) return null;
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.id || payload.sub || null;
  } catch {
    return null;
  }
}


export default function TelaAgendamento() {


  const [agendamentos, setAgendamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [toastMensagem, setToastMensagem] = useState('');
  const token = localStorage.getItem('token');
  const proprietarioId = getProprietarioIdFromToken(token);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);

  const carregarAgendamentos = async () => {
  try {
    const token = localStorage.getItem('token');
    const resposta = await listarAgendamentosProprietario(token);
    setAgendamentos(resposta);
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
  };


  function abrirConfirmacaoExclusao(id) {
    setIdExcluir(id);
    setModalConfirmOpen(true);
  }

  async function confirmarExclusao() {
    if (idExcluir !== null) {
      await excluirAgendamento(idExcluir); 
      setModalConfirmOpen(false);
      setIdExcluir(null);
      // Forçando o toast a ser exibido após exclusão
      setToastMensagem('Agendamento excluído com sucesso!');
      // Ou você pode fazer a chamada à função 'handleSalvarComToast' caso ela manipule a resposta da exclusão
      setTimeout(() => {
        setToastMensagem('');
      }, 3000); // Limpa a mensagem do toast após 3 segundos
    }
  }

  function cancelarExclusao() {
    setModalConfirmOpen(false);
    setIdExcluir(null);
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const agendamentosFiltrados = agendamentos.filter(a =>
    (a.descricao && a.descricao.toLowerCase().includes(busca.toLowerCase())) ||
    (a.tipo && a.tipo.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleSalvarComToast = (resposta) => {
    setToastMensagem('');
    setTimeout(() => {
      setToastMensagem(resposta.mensagem);

      if (resposta.tipo === "sucesso") {
        carregarAgendamentos(); 
        setTimeout(() => {
          setModalAberto(false);
        }, 1000);
      }
    }, 100);
  };


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

  async function excluirAgendamento(id) {
    try {
      const token = localStorage.getItem('token');
      await deletarAgendamentoProprietario(id, token);
      setAgendamentos(ags => ags.filter(a => a.id !== id));
      setToastMensagem("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      setToastMensagem("Erro ao excluir agendamento.");
    }
  }

  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

  function atualizarDados() {
    listarAgendamentosProprietario()
      .then(setAgendamentos)
      .catch((err) => console.error("Erro ao atualizar agendamentos:", err));
  }

  return (
    <div className={`agendamento-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal-agendamento">

        <header className="header-agendamentos">

          <div className='title-header-agendamentos'>

            <h1>Agendamentos</h1>
          
            <LogoAndNotification />
  
          </div>


        </header>
        <main className="area-agendamentos">


          <div className="controlesTable-container">

            <div className="buscaAgendamento-container">
              <CampoBuscaAgendamentos 
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

          <div className='Area-Tabela-Agendamentos'>

            <TabelaAgendamentos
              dados={agendamentosFiltrados}
              onEditar={abrirModalParaEditar}
              onExcluir={abrirConfirmacaoExclusao} 
            />
            
          </div>

          {modalAberto && (
            <ModalAgendamento
              agendamento={agendamentoSelecionado}
              token={token}  // passe token para modal
              onClose={fecharModal}
              onSalvar={handleSalvarComToast}
              onExcluir={excluirAgendamento} 
            />
          )}

          {modalConfirmOpen && (
            <ConfirmDialog
              mensagem={`Tem certeza que deseja realizar a exclusão do agendamento de ID: ${idExcluir}?`}
              onConfirm={confirmarExclusao}
              onCancel={cancelarExclusao}
            />
          )}
        </main>
      </div>


      {toastMensagem && (
        <div className="toast-agendamento">
          <div className="toast-sucesso-barra-lateral"></div>
          <div className="toast-sucesso-conteudo-agendamento">
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
  