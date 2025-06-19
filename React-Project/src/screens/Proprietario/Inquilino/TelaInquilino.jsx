import React, { useState, useEffect } from 'react';
import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaInquilinos from "./TabelaInquilinos";
import ModalInquilino from "./ModalInquilino";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import ConfirmDialog from '../../Components/ConfirmDialog';
import './TelaInquilino.css';

export default function TelaInquilino({ token }) {
  const [inquilinos, setInquilinos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [inquilinoSelecionado, setInquilinoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);
  const [toastMensagem, setToastMensagem] = useState('');

  const handleSalvar = (resposta) => {
    carregarInquilinos();
    setModalAberto(false);
    if (resposta?.mensagem) {
      setToastMensagem(resposta.mensagem);
      setTimeout(() => setToastMensagem(''), 3000);
    }
  };

  const inquilinosFiltrados = inquilinos.filter(i =>
    (i.nome && i.nome.toLowerCase().includes(busca.toLowerCase())) ||
    (i.cpf && i.cpf.toLowerCase().includes(busca.toLowerCase())) ||
    (i.telefone && i.telefone.toLowerCase().includes(busca.toLowerCase())) ||
    (i.profissao && i.profissao.toLowerCase().includes(busca.toLowerCase()))
  );

  function abrirModalParaEditar(inquilino) {
    setInquilinoSelecionado(inquilino);
    setModalAberto(true);
  }

  function abrirModalNovo() {
    setInquilinoSelecionado(null);
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

  function salvarInquilino(novoInquilino) {
    if (inquilinoSelecionado) {
      setInquilinos(inqs =>
        inqs.map(i => (i.id === novoInquilino.id ? novoInquilino : i))
      );
    } else {
      setInquilinos(inqs => [...inqs, { ...novoInquilino, id: Date.now() }]);
    }
    fecharModal();
    setTimeout(() => setToastMensagem(""), 3000);
  }

  async function excluirInquilino(id) {
    try {
      // Aqui você pode adicionar a chamada para a API quando estiver disponível
      // const token = localStorage.getItem('token');
      // await deletarInquilinoProprietario(id, token);
      setInquilinos(inqs => inqs.filter(i => i.id !== id));
      setToastMensagem("Inquilino excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir inquilino:", error);
      setToastMensagem("Erro ao excluir inquilino.");
    }
  }

  async function confirmarExclusao() {
    if (idExcluir !== null) {
      try {
        // Aqui você pode adicionar a chamada para a API quando estiver disponível
        // const token = localStorage.getItem('token');
        // await deletarInquilinoProprietario(idExcluir, token);
        setModalConfirmOpen(false);
        setInquilinos(inquilinos => inquilinos.filter(i => i.id !== idExcluir));
        setToastMensagem('Inquilino excluído com sucesso!');
      } catch (error) {
        console.error("Erro ao excluir inquilino:", error);
        setToastMensagem('Erro ao excluir inquilino.');
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

  const atualizarDados = async () => {
    try {
      // Aqui você pode adicionar a chamada para a API quando estiver disponível
      // const inquilinosAtualizados = await listarInquilinos();
      // setInquilinos(inquilinosAtualizados);
      
      setToastMensagem("Inquilinos atualizados com sucesso!");
      setTimeout(() => {
        setToastMensagem('');
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar inquilinos:", error);
      setToastMensagem("Erro ao atualizar inquilinos.");
    }
  };

  async function carregarInquilinos() {
    try {
      // Aqui você pode adicionar a chamada para a API quando estiver disponível
      // const resultado = await listarInquilinos();
      // setInquilinos(resultado);
      
      // Dados de exemplo para demonstração
      const dadosExemplo = [];
      setInquilinos(dadosExemplo);
    } catch (erro) {
      console.error("Erro ao listar inquilinos:", erro);
    }
  }

  useEffect(() => {
    carregarInquilinos();
  }, []);

  return (
    <div className={`inquilino-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal-inquilino">

        <header className="header-inquilinos">
          <div className='title-header-inquilinos'>

            <div className='title-inquilino'>
              <h1>Moradores</h1>
            </div>

            <div className='Logo-Notification'>
              <LogoAndNotification />
            </div>

          </div>

        </header>

        <main className="area-inquilinos">

          <div className="controlesTable-container">

            <div className="buscaInquilino-container">
              <CampoBusca 
                placeholder="Faça sua busca..." 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)} 
              />
            </div>
            <div className="botoes-container-inquilino">
              <button className="botao-atualizar-inquilinos" onClick={atualizarDados} title="Atualizar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
              </button>
              <BotaoNovo onClick={abrirModalNovo} />
            </div>
          </div>

          <div className='Area-Tabela-Inquilinos'>
            <TabelaInquilinos
              dados={inquilinosFiltrados}
              inquilinos={inquilinos}
              onEditar={abrirModalParaEditar}
              onExcluir={abrirConfirmacaoExclusao}
            />
          </div>

          {modalAberto && (
            <ModalInquilino
              inquilino={inquilinoSelecionado}
              token={token} 
              onClose={fecharModal}
              onSalvar={handleSalvar}
            />
          )}
        </main>

        {modalConfirmOpen && (
          <ConfirmDialog
            mensagem={`Tem certeza que deseja excluir o inquilino de ID: ${idExcluir}?`}
            onConfirm={confirmarExclusao}
            onCancel={cancelarExclusao}
          />
        )}
      </div>

      {toastMensagem && (
        <div className="toast-inquilino">
          <div className="toast-sucesso-barra-lateral"></div>
          <div className="toast-sucesso-conteudo-inquilino">
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

