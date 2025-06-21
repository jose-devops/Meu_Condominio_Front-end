import React, { useState, useEffect } from 'react';

import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaPrestador from "./TabelaPrestador";
import ModalPrestador from "./ModalPrestador";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './TelaPrestador.css';
import ConfirmDialog from '../../Components/ConfirmDialog';
import { listarEspecialidade } from '../../../api/Proprietario-Api/PrestadoresService';
import { listarPrestadores, deletarPrestador } from '../../../api/Proprietario-Api/PrestadoresService';

export default function TelaPrestador({token}) {
  const [prestadores, setPrestadores] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [prestadorSelecionado, setPrestadorSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [toastMensagem, setToastMensagem] = useState('');
  const [idExcluir, setIdExcluir] = useState(null);


  async function confirmarExclusao() {
  try {
    await deletarPrestador(idExcluir, token);
    setToastMensagem("Prestador excluído com sucesso!");
    setTimeout(() => setToastMensagem(''), 3000);
    setModalConfirmOpen(false);
    setIdExcluir(null);
    await carregarPrestadores(); 
  } catch (error) {
    console.error("Erro ao excluir prestador:", error);
    setToastMensagem("Erro ao excluir prestador.");
    setTimeout(() => setToastMensagem(''), 3000);
  }
}



  function abrirConfirmacaoExclusao(id) {
    setIdExcluir(id);
    setModalConfirmOpen(true);
  }

  function excluirPrestador(prestador) {
    abrirConfirmacaoExclusao(prestador.id); // ← pode estar errado se não for id
  }

  function cancelarExclusao() {
    setModalConfirmOpen(false);
    setIdExcluir(null);
  }


  const carregarPrestadores = async () => {
    try {
      const dados = await listarPrestadores();
      setPrestadores(dados);
    } catch (error) {
      console.error("Erro ao carregar prestadores:", error);
    }
  };


  useEffect(() => {
    carregarPrestadores();
  }, []);

  const prestadoresFiltrados = prestadores.filter(p =>
    (p.razao && p.razao.toLowerCase().includes(busca.toLowerCase())) ||
    (p.cpfCnpj && p.cpfCnpj.toLowerCase().includes(busca.toLowerCase())) ||
    (p.profissao && p.profissao.toLowerCase().includes(busca.toLowerCase()))
  );

  function abrirModalParaEditar(prestador) {
    setPrestadorSelecionado(prestador);
    setModalAberto(true);
  }

  function abrirModalNovo() {
    setPrestadorSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  async function salvarPrestador(resultado) {
    try {
      fecharModal();
      await carregarPrestadores();
      setToastMensagem(resultado.mensagem); // Usa a mensagem enviada pelo modal
      setTimeout(() => setToastMensagem(''), 3000);
    } catch (error) {
      console.error("Erro ao salvar prestador:", error);
      setToastMensagem("Erro ao salvar prestador.");
      setTimeout(() => setToastMensagem(''), 3000);
    }
  }



  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

  const atualizarDados = async () => {
    try {
     
      const prestadoresAtualizados = await listarPrestadores();
      setPrestadores(prestadoresAtualizados);
      
      setToastMensagem("Prestadores atualizados com sucesso!");
      setTimeout(() => {
        setToastMensagem('');
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar Prestadores:", error);
      setToastMensagem("Erro ao atualizar Prestadores.");
    }
  };

  return (
    <div className={`prestador-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal-prestador">

        <header className="header-prestador">
          <div className='title-header-prestador'>

            <div className='title-prestador'>
              <h1>Prestadores</h1>
            </div>

            <div className='Logo-Notification'>
              <LogoAndNotification />       
            </div>

          </div>
 
        </header>



        <main className="area-prestador">

          <div className="controlesTable-container">

            <div className="buscaPrestador-container">
              <CampoBusca
                placeholder="Faça sua busca..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className="botoes-container-prestador">
              <button className="botao-atualizar" onClick={atualizarDados} title="Atualizar">
                {/* Ícone de atualização SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
              </button>
              <BotaoNovo onClick={abrirModalNovo} />
            </div>
          </div>

          <div className='Area-Tabela-Prestador'>

            <TabelaPrestador
              prestadores={prestadoresFiltrados}
              onEditar={abrirModalParaEditar}
              onExcluir={excluirPrestador}
            />

          </div>

          {modalAberto && (
            <ModalPrestador
              prestador={prestadorSelecionado}
              onClose={fecharModal}
              onSalvar={salvarPrestador}
            />
          )}
        </main>

        {modalConfirmOpen && (
          <ConfirmDialog
            mensagem={`Tem certeza que deseja excluir o prestador de ID: ${idExcluir}?`}
            onConfirm={confirmarExclusao}
            onCancel={cancelarExclusao}
          />
        )}
      </div>
      {toastMensagem && (
        <div className="toast-prestador">
          <div className="toast-sucesso-barra-lateral"></div>
          <div className="toast-sucesso-conteudo-prestador">
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
