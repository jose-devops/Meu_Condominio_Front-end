import React, { useState, useEffect } from 'react';

import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaPrestador from "./TabelaPrestador";
import ModalPrestador from "./ModalPrestador";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './EstiloPrestador.css';

export default function TelaPrestador() {
  const [prestadores, setPrestadores] = useState([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [prestadorSelecionado, setPrestadorSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);

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
      // Simula a adição com um ID único (em um caso real, o backend geraria o ID)
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
    <div className={`tela-prestador-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal">
        <header className="header">
          <LogoAndNotification />
        </header>
        <main className="conteudo-prestador">
          <div className="titulo-container">
            {/* Título ajustado e ícone conforme imagem 1.png */}
            <h2 className="titulo">Prestadores <span className="prestador-icon">⚙️</span></h2>
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
                {/* Ícone de atualização SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
              </button>
              <BotaoNovo onClick={abrirModalNovo} />
            </div>
          </div>

          <TabelaPrestador
            prestadores={prestadoresFiltrados}
            onEditar={abrirModalParaEditar}
            onExcluir={excluirPrestador}
          />

          {modalAberto && (
            <ModalPrestador
              prestador={prestadorSelecionado}
              onClose={fecharModal}
              onSalvar={salvarPrestador}
            />
          )}
        </main>
      </div>
    </div>
  );
}
