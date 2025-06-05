import React, { useState, useEffect } from 'react';

// Reutilizando componentes existentes
import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaInquilino from "./TabelaInquilino"; // Tabela específica para Inquilino
import ModalInquilino from "./ModalInquilino"; // Modal específico para Inquilino
import BotaoNovo from "../Botoes/BotaoNovo"; // Botão Novo reutilizado
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './EstiloInquilino.css'; // Estilos específicos para Inquilino

export default function TelaInquilino() {
  const [inquilinoes, setInquilinoes] = useState([]); // Inicia com array vazio
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [inquilinoSelecionado, setInquilinoSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);

  // TODO: Substituir por chamada API real para carregar inquilinoes
  useEffect(() => {
    // Comentado para não usar dados mockados - a tabela iniciará vazia
    /*
    const dadosMock = [
      { id: 1, nome: "Ezequiel Mulina", cpf: "000.000.000-16", dataNascimento: "00/00/0000", telefone1: "49 99999-9999", telefone2: "49 99999-9999", profissao: "Pedreiro" },
      { id: 2, nome: "Ezequiel Mulina", cpf: "000.000.000-16", dataNascimento: "00/00/0000", telefone1: "49 99999-9999", telefone2: "49 99999-9999", profissao: "Programador" },
      { id: 3, nome: "Ezequiel Mulina", cpf: "000.000.000-16", dataNascimento: "00/00/0000", telefone1: "49 99999-9999", telefone2: "49 99999-9999", profissao: "Médico" },
      { id: 4, nome: "Ezequiel Mulina", cpf: "000.000.000-16", dataNascimento: "00/00/0000", telefone1: "49 99999-9999", telefone2: "49 99999-9999", profissao: "Pintor" },
    ];
    setInquilinoes(dadosMock);
    */
    // Aqui você chamaria sua API para buscar os dados reais
    // fetchInquilinoes();
  }, []);

  // Filtragem de inquilinoes com base na busca
  const inquilinoesFiltrados = inquilinoes.filter(m =>
    (m.nome && m.nome.toLowerCase().includes(busca.toLowerCase())) ||
    (m.cpf && m.cpf.toLowerCase().includes(busca.toLowerCase())) ||
    (m.profissao && m.profissao.toLowerCase().includes(busca.toLowerCase()))
  );

  // Funções para controlar o modal
  function abrirModalParaEditar(inquilino) {
    setInquilinoSelecionado(inquilino);
    setModalAberto(true);
  }

  function abrirModalNovo() {
    setInquilinoSelecionado(null); // Garante que o modal abra vazio para novo cadastro
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setInquilinoSelecionado(null); // Limpa seleção ao fechar
  }

  // Função para salvar (adicionar ou editar) inquilino
  // TODO: Substituir por chamadas API reais para salvar/atualizar
  function salvarInquilino(novoInquilino) {
    if (inquilinoSelecionado) {
      // Edição (simulação local)
      console.log("Editando inquilino:", novoInquilino);
      setInquilinoes(ms =>
        ms.map(m => (m.id === novoInquilino.id ? novoInquilino : m))
      );
    } else {
      // Adição (simulação local com ID temporário)
      const inquilinoComId = { ...novoInquilino, id: Date.now() };
      console.log("Adicionando inquilino:", inquilinoComId);
      setInquilinoes(ms => [...ms, inquilinoComId]);
    }
    fecharModal();
  }

  // Função para excluir inquilino
  // TODO: Substituir por chamada API real para excluir
  function excluirInquilino(id) {
    console.log("Excluindo inquilino ID:", id);
    setInquilinoes(ms => ms.filter(m => m.id !== id));
  }

  // Função para alternar o menu lateral
  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }

  // Função para atualizar dados (simulação)
  // TODO: Implementar lógica real de atualização
  function atualizarDados() {
    console.log("Atualizando dados dos inquilinoes...");
    // fetchInquilinoes(); // Exemplo de chamada para buscar dados atualizados
  }

  return (
    <div className={`tela-inquilino-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal">
        <header className="header">
          <LogoAndNotification />
        </header>
        <main className="conteudo-inquilino">
          <div className="titulo-container">
            <h2 className="titulo">Inquilinoes <span className="inquilino-icon">👥</span></h2>
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
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
              </button>
              <BotaoNovo onClick={abrirModalNovo} />
            </div>
          </div>

          <TabelaInquilino
            inquilinoes={inquilinoesFiltrados} // Passa a lista (agora vazia inicialmente)
            onEditar={abrirModalParaEditar}
            onExcluir={excluirInquilino}
          />

          {modalAberto && (
            <ModalInquilino
              inquilino={inquilinoSelecionado} // Passa null para novo, ou o inquilino para editar
              onClose={fecharModal}
              onSalvar={salvarInquilino}
            />
          )}
        </main>
      </div>
    </div>
  );
}

