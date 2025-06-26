import React, { useState, useEffect } from 'react';

import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import MenuLateralMorador from '../../Components/Morador/MenuLateral/MenuLateralMorador';
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import TabelaPrestadorMorador from '../../Components/Morador/PrestadorMorador/TabelaPrestadorMorador';
import './TelaPrestadorMorador.css';
import ModalContratoMorador from '../../Components/Morador/ModalContrato/ModalContratoMorador';
import ModalPerfilMorador from '../../Components/Morador/ModalMorador/ModalPerfilMorador';


export default function TelaPrestadorMorador() {
  const [prestadores, setPrestadores] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [prestadorSelecionado, setPrestadorSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [showModalContrato, setShowModalContrato] = useState(false); // Estado para controlar a exibição do modal
  const [showModalPerfilMorador, setShowModalPerfilMorador] = useState(false);
  

  useEffect(() => {
    // Simulação de dados iniciais, idealmente viria de uma API
    const dadosMock = [
      // { id: 1, razao: "Exemplo Prestador", cpfCnpj: "111.222.333-44", dataNascimento: "10/05/1985", telefone1: "(11) 91234-5678", telefone2: "", profissao: "Pedreiro" },
      // Adicione mais dados mock se necessário para testes
    ];
    setPrestadores(dadosMock);
  }, []);

  const prestadoresFiltrados = prestadores.filter(p =>
    (p.razao && p.razao.toLowerCase().includes(busca.toLowerCase())) ||
    (p.cpfCnpj && p.cpfCnpj.toLowerCase().includes(busca.toLowerCase())) ||
    (p.profissao && p.profissao.toLowerCase().includes(busca.toLowerCase()))
  );


  
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

  function abrirModalNovo() {
    setPrestadorSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function salvarPrestador(novoPrestador) {
    if (prestadorSelecionado) {
      setPrestadores(ps =>
        ps.map(p => (p.id === novoPrestador.id ? novoPrestador : p))
      );
    } else {
      setPrestadores(ps => [...ps, { ...novoPrestador, id: Date.now() }]);
    }
    fecharModal();
  }

  function excluirPrestador(id) {
    setPrestadores(ps => ps.filter(p => p.id !== id));
  }

  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

  function atualizarDados() {
    console.log("Atualizando dados...");
    // Lógica para buscar dados atualizados da API
  }

  return (
    <div className={`morador-tela-prestador-container ${sidebarRetracted ? 'morador-sidebar-collapsed' : ''}`}>
      <MenuLateralMorador isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} openModalContrato={openModalContrato}  openModalPerfilMorador={openModalPerfilMorador} />
      <div className="morador-conteudo-principal">
        <header className="morador-header">
          <LogoAndNotification />
        </header>
        <main className="morador-conteudo-prestador">
          <div className="morador-titulo-container">
            <h2 className="morador-titulo">Prestadores <span className="morador-prestador-icon">⚙️</span></h2>
          </div>
          <div className="morador-controles-container">
            <div className="morador-busca-container">
              <CampoBusca
                placeholder="Faça sua busca..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          <TabelaPrestadorMorador
            prestadores={prestadoresFiltrados}
            onEditar={abrirModalParaEditar}
            onExcluir={excluirPrestador}
          />


          {showModalContrato && <ModalContratoMorador onClose={closeModalContrato} />}
          {showModalPerfilMorador && <ModalPerfilMorador onClose={closeModalPerfilMorador} />}
        
        </main>
      </div>
    </div>
  );
}
