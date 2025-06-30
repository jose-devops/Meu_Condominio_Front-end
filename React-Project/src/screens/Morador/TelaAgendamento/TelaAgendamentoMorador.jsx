import { listarAgendamentosMorador } from '../../../api/Morador-Api/AgendamentoMoradorService';
import { deletarAgendamentoMorador } from '../../../api/Morador-Api/AgendamentoMoradorService';


import ConfirmDialog from '../../Components/ConfirmDialog';
import React, { useState, useEffect } from 'react';
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './TelaAgendamentoMorador.css';
import FiltroBuscaMorador from '../../Components/Morador/AgendamentosMorador/FiltroBuscaMorador';                   
import TabelaAgendamentosMorador from '../../Components/Morador/AgendamentosMorador/TabelaAgendamentoMorador';     
import ModalAgendamentoMorador from '../../Components/Morador/AgendamentosMorador/ModalAgendamentoMorador';       
import BotaoNovoMorador from '../../Components/Morador/AgendamentosMorador/BotaoNovoMorador';
import MenuLateralMorador from '../../Components/Morador/MenuLateral/MenuLateralMorador';
import ModalContratoMorador from '../../Components/Morador/ModalContrato/ModalContratoMorador';
import ModalPerfilMorador from '../../Components/Morador/ModalMorador/ModalPerfilMorador';




function getMoradorIdFromToken(token) {
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

export default function TelaAgendamentoMorador() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [toastMensagem, setToastMensagem] = useState('');
  const token = localStorage.getItem('token');
  const moradorId = getMoradorIdFromToken(token);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);
  const [showModalContrato, setShowModalContrato] = useState(false); // Estado para controlar a exibição do modal
  const [showModalPerfilMorador, setShowModalPerfilMorador] = useState(false);
  
    
const openModalPerfilMorador = () => {
  setShowModalPerfilMorador(true);
};

const closeModalPerfilMorador = () => {
  setShowModalPerfilMorador(false);
};


  const openModalContrato = () => {
    setShowModalContrato(true);
  };

  const closeModalContrato = () => {
    setShowModalContrato(false);
  };

  const carregarAgendamentos = async () => {
    try {
      const token = localStorage.getItem('token');
      const resposta = await listarAgendamentosMorador(token);
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
      setToastMensagem('Agendamento excluído com sucesso!');
      setTimeout(() => {
        setToastMensagem('');
      }, 3000);
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
  setToastMensagem(resposta.mensagem);

  if (resposta.tipo === "sucesso") {
    carregarAgendamentos(); 
    setTimeout(() => {
      setModalAberto(false);
    }, 1000);
  }

  setTimeout(() => {
    setToastMensagem('');
  }, 3000);
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
      await deletarAgendamentoMorador(id, token);
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

  const atualizarDados = async () => {
    try {
      const agendamentosAtualizados = await listarAgendamentosMorador();
      setAgendamentos(agendamentosAtualizados);
      setToastMensagem("Agendamentos atualizados com sucesso!");
      setTimeout(() => {
        setToastMensagem('');
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar agendamentos:", error);
      setToastMensagem("Erro ao atualizar agendamentos.");
    }
  };

  return (
    <div className={`morador-agendamento-container ${sidebarRetracted ? 'morador-sidebar-collapsed' : ''}`}>
      <MenuLateralMorador isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} openModalContrato={openModalContrato}  openModalPerfilMorador={openModalPerfilMorador} />
      <div className="morador-conteudo-principal-agendamento">
        <header className="morador-header-agendamentos">
          <div className='morador-title-header-agendamentos'>
            <div className='morador-title-agendamento'>
              <h1>Agendamentos</h1>
            </div>
            <div className='morador-Logo-Notification'  onClick={openModalPerfilMorador}>
              <LogoAndNotification />
            </div>
          </div>
        </header>

        <main className="morador-area-agendamentos">
          <div className="morador-controlesTable-container">
            <div className="morador-buscaAgendamento-container">
              <FiltroBuscaMorador 
                value={busca} 
                onChange={setBusca} 
              />
            </div>
            <div className="morador-botoes-container-agendamento">
              <button className="morador-botao-atualizar-agendamentos" onClick={atualizarDados} title="Atualizar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
              </button>
              <BotaoNovoMorador onClick={abrirModalNovo} />
            </div>
          </div>

          <div className='morador-Area-Tabela-Agendamentos'>
            <TabelaAgendamentosMorador
              dados={agendamentosFiltrados}
              onEditar={abrirModalParaEditar}
              onExcluir={abrirConfirmacaoExclusao} 
            />
          </div>


                          {/* Modal de contrato */}
                    {showModalContrato && <ModalContratoMorador onClose={closeModalContrato} />}
                    {showModalPerfilMorador && <ModalPerfilMorador onClose={closeModalPerfilMorador} />}
                  

          {modalAberto && (
            <ModalAgendamentoMorador
              agendamentoMorador={agendamentoSelecionado}
              token={token}
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
        <div className="morador-toast-agendamento">
          <div className="morador-toast-sucesso-barra-lateral"></div>
          <div className="morador-toast-sucesso-conteudo-agendamento">
            <div className="morador-text-toats">
              <span className="morador-toast-texto">{toastMensagem}</span>
            </div>
          </div>
          <span className="morador-toast-fechar" onClick={() => setToastMensagem('')}>
            ×
          </span>
        </div>
      )}
    </div>
  );
}
