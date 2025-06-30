import React, { useState, useEffect } from 'react';

import CampoBusca from "../../Components/CampoBusca/CampoBusca";

import MenuLateralMorador from '../../Components/Morador/MenuLateral/MenuLateralMorador';
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import TabelaPrestadorMorador from '../../Components/Morador/PrestadorMorador/TabelaPrestadorMorador';
import './TelaPrestadorMorador.css';
import ModalContratoMorador from '../../Components/Morador/ModalContrato/ModalContratoMorador';
import ModalPerfilMorador from '../../Components/Morador/ModalMorador/ModalPerfilMorador';
import { listarPrestadoresMorador } from '../../../api/Morador-Api/PrestadorMoradorService';
import ModalPrestadorMorador from '../../Components/Morador/ModalPrestador/ModalPrestadorMorador';


export default function TelaPrestadorMorador() {
  const [prestadores, setPrestadores] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [prestadorSelecionado, setPrestadorSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [showModalContrato, setShowModalContrato] = useState(false); // Estado para controlar a exibição do modal
  const [showModalPerfilMorador, setShowModalPerfilMorador] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [toastMensagem, setToastMensagem] = useState('');
  const [idExcluir, setIdExcluir] = useState(null);











  const carregarPrestadores = async () => {
    try {
      const dados = await listarPrestadoresMorador();
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
       
        const prestadoresAtualizados = await listarPrestadoresMorador();
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

  function abrirModalParaEditar(prestador) {
    setPrestadorSelecionado(prestador);
    setModalAberto(true);
  }



  function fecharModal() {
    setModalAberto(false);
  }





  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }





  return (
    <div className={`prestador-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateralMorador isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} openModalContrato={openModalContrato}  openModalPerfilMorador={openModalPerfilMorador} />
      <div className="conteudo-principal-prestador">

        <header className="header-prestador">
          <div className='title-header-prestador'>

            <div className='title-prestador'>
              <h1>Prestadores</h1>
            </div>

            <div className='Logo-Notification'  onClick={openModalPerfilMorador}>
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
             
            </div>

          </div>

          <div className='Area-Tabela-Prestador'>

            <TabelaPrestadorMorador
              prestadores={prestadoresFiltrados}
              onEditar={abrirModalParaEditar}
              
            />

          </div>

            {modalAberto && (
              <ModalPrestadorMorador
                prestador={prestadorSelecionado}
                onClose={fecharModal}
                onSalvar={salvarPrestador}
              />
            )}


          {showModalContrato && <ModalContratoMorador onClose={closeModalContrato} />}
          {showModalPerfilMorador && <ModalPerfilMorador onClose={closeModalPerfilMorador} />}
        
        </main>

  
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
