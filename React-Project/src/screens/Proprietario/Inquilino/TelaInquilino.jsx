import React, { useState, useEffect } from 'react';
import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaInquilinos from "./TabelaInquilinos";
import ModalInquilino from "./ModalInquilino";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import ConfirmDialog from '../../Components/ConfirmDialog';
import './TelaInquilino.css';

import { listarInquilinos, deletarInquilino } from '../../../api/Proprietario-Api/MoradorService'; // ajuste o caminho conforme sua pasta



export default function TelaInquilino({ token }) {
  const [inquilinos, setInquilinos] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [inquilinoSelecionado, setInquilinoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);
  const [toastMensagem, setToastMensagem] = useState('');


  async function carregarInquilinos() {
    try {
      const resultado = await listarInquilinos(); 
      setInquilinos(resultado); 
    } catch (erro) {
      console.error("Erro ao listar inquilinos:", erro);
      setErro("Erro ao carregar inquilinos: " + erro.message); 
    }
  }

  useEffect(() => {
    carregarInquilinos(); 
  }, []);  





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

function excluirInquilino(inquilino) {
  console.log("Inquilino clicado para exclusão:", inquilino);
  abrirConfirmacaoExclusao(inquilino.id); // ← pode estar errado se não for id
}

  function cancelarExclusao() {
    setModalConfirmOpen(false);
    setIdExcluir(null);
  }

  async function salvarInquilino() {
    try {
      const dataAtualizada = await listarMoradores(token); // busca do backend para listar inquilinos
      setInquilinos(dataAtualizada); // atualiza a lista de inquilinos na tela

      setToastMensagem(inquilinoSelecionado ? 'Inquilino atualizado com sucesso!' : 'Inquilino cadastrado com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar ou carregar inquilinos:", error);
      setToastMensagem('Erro ao salvar inquilino.');
    } finally {
      fecharModal(); // fecha o modal após a ação
      setTimeout(() => setToastMensagem(''), 3000); // limpa a mensagem de sucesso/erro após 3 segundos
    }
  }

async function confirmarExclusao() {
  if (idExcluir !== null) {
    try {
      console.log("Tentando deletar ID:", idExcluir); // <== Adicione isso
      const token = localStorage.getItem('token');
      await deletarInquilino(idExcluir); // se idExcluir for undefined aqui, já temos a causa

      const dataAtualizada = await listarInquilinos();
      setInquilinos(dataAtualizada);

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
     
      const inquilinosAtualizados = await listarInquilinos();
      setInquilinos(inquilinosAtualizados);
      
      setToastMensagem("Inquilinos atualizados com sucesso!");
      setTimeout(() => {
        setToastMensagem('');
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar inquilinos:", error);
      setToastMensagem("Erro ao atualizar inquilinos.");
    }
  };






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
              dados={inquilinosFiltrados}  // Passando a lista filtrada de inquilinos
              inquilinos={inquilinos}  // Passando a lista completa de inquilinos
              onEditar={abrirModalParaEditar}
              onExcluir={excluirInquilino}
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
            mensagem={`Tem certeza que deseja excluir o Morador de ID: ${idExcluir}?`}
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

