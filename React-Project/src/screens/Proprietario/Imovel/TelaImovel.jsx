import React, { useState, useEffect } from 'react';
import CampoBusca from "../../Components/CampoBusca/CampoBusca";
import TabelaImoveis from "./TabelaImoveis";
import ModalImovel from "./ModalImovel";
import BotaoNovo from "../Botoes/BotaoNovo";
import MenuLateral from "../../Components/MenuLateral/MenuLateral";
import LogoAndNotification from "../../Components/MenuLateral/Logo&Notificacao/LogoAndNotification";
import './TelaImovel.css';
import { listarImoveis } from '../../../api/Proprietario-Api/ImovelService';
import { deletarImovelProprietario } from '../../../api/Proprietario-Api/ImovelService';
import ConfirmDialog from '../../Components/ConfirmDialog';




export default function TelaImovel() {
 
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState(null);
  const [sidebarRetracted, setSidebarRetracted] = useState(false);
  const [imoveis, setImoveis] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);
  const [toastMensagem, setToastMensagem] = useState('');
  const token = localStorage.getItem('token');
  const proprietarioId = getProprietarioIdFromToken(token);


    const carregarImoveis = async () => {
    try {
      const token = localStorage.getItem('token');
      const resposta = await listarImoveis(token);
      setImoveis(resposta);
    } catch (error) {
      console.error("Erro ao carregar imoveis:", error);
    }
    };



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


  const imoveisFiltrados = imoveis.filter(i =>
    (i.proprietario && i.proprietario.toLowerCase().includes(busca.toLowerCase())) ||
    (i.inquilino && i.inquilino.toLowerCase().includes(busca.toLowerCase())) ||
    (i.endereco && i.endereco.toLowerCase().includes(busca.toLowerCase())) ||
    (i.cidade && i.cidade.toLowerCase().includes(busca.toLowerCase())) ||
    (i.bairro && i.bairro.toLowerCase().includes(busca.toLowerCase())) ||
    (i.situacao && i.situacao.toLowerCase().includes(busca.toLowerCase()))
  );


    useEffect(() => {
    const carregarImoveis = async () => {
      try {
        const data = await listarImoveis();
        setImoveis(data);
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarImoveis();
  }, []);

  function abrirModalParaEditar(imovel) {
    setImovelSelecionado(imovel);
    setModalAberto(true);
  }

  function excluirImovel(imovel) {
    abrirConfirmacaoExclusao(imovel.id);
  }

  function abrirModalNovo() {
    setImovelSelecionado(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function cancelarExclusao() {
    setModalConfirmOpen(false);
    setIdExcluir(null);
  }

  function abrirConfirmacaoExclusao(id) {
    setIdExcluir(id);
    setModalConfirmOpen(true);
  }

async function confirmarExclusao() {
  if (idExcluir !== null) {
    try {
      const token = localStorage.getItem('token');
      await deletarImovelProprietario(idExcluir, token);

      // Recarrega os imóveis do backend após deletar
      const dataAtualizada = await listarImoveis();
      setImoveis(dataAtualizada);

      setToastMensagem('Imóvel excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
      setToastMensagem('Erro ao excluir imóvel.');
    } finally {
      setModalConfirmOpen(false);
      setIdExcluir(null);
      setTimeout(() => setToastMensagem(''), 3000);
    }
  }
}

  async function salvarImovel() {
    try {
      const dataAtualizada = await listarImoveis(token); // busca do backend
      setImoveis(dataAtualizada); // atualiza a lista na tela
      setToastMensagem(imovelSelecionado ? 'Imóvel atualizado com sucesso!' : 'Imóvel cadastrado com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar ou carregar imóveis:", error);
      setToastMensagem('Erro ao salvar imóvel.');
    } finally {
      fecharModal();
      setTimeout(() => setToastMensagem(''), 3000);
    }
  }



  function toggleSidebar() {
    setSidebarRetracted(prev => !prev);
  }


    const atualizarDados = async () => {
      try {
        // Recarrega os agendamentos
        const imoveisAtualizados = await listarImoveis();

        // Atualiza o estado com os agendamentos mais recentes
        setImoveis(imoveisAtualizados);

        // Exibe a mensagem de sucesso (toast)
        setToastMensagem("Imoveis atualizados com sucesso!");

        // Limpa a mensagem após 3 segundos
        setTimeout(() => {
          setToastMensagem('');
        }, 3000);
      } catch (error) {
        console.error("Erro ao atualizar imoveis:", error);
        setToastMensagem("Erro ao atualizar imoveis.");
      }
    };

  return (
    <div className={`imovel-container ${sidebarRetracted ? 'sidebar-collapsed' : ''}`}>
      <MenuLateral isCollapsed={sidebarRetracted} toggleSidebar={toggleSidebar} />
      <div className="conteudo-principal-imovel">


        <header className="header-imoveis">

            <div className='title-header-imoveis'>

              <div className='title-imovel'>
                <h1>Imoveis</h1>
              </div>

              <div className='Logo-Notification'>
                <LogoAndNotification />
              </div>


            </div>
        </header>


        <main className="area-imoveis">

          <div className="controlesTable-container">

            <div className="buscaImovel-container">
              <CampoBusca
                placeholder="Faça sua busca..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>


            <div className="botoes-container-imovel">
              <button className="botao-atualizar-imoveis" onClick={atualizarDados} title="Atualizar">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
              </button>
              <BotaoNovo onClick={abrirModalNovo} texto="NOVO" />
            </div>
          </div>

          <div className='Area-Tabela-Imoveis'>
            <TabelaImoveis
              dados={imoveis}
              onEditar={abrirModalParaEditar}
              onExcluir={excluirImovel}
            />

          </div>

          {modalAberto && (
            <ModalImovel
              imovel={imovelSelecionado}
              token={token}
              onClose={fecharModal}
              onSalvar={salvarImovel}
            />
          )}

        </main>
      </div>

      {modalConfirmOpen && (
        <ConfirmDialog
          mensagem={`Tem certeza que deseja excluir o imovel de ID: ${idExcluir}?`}
          onConfirm={confirmarExclusao}
          onCancel={cancelarExclusao}
        />
      )}

      {toastMensagem && (
        <div className="toast-imovel">
          <div className="toast-sucesso-barra-lateral"></div>
          <div className="toast-sucesso-conteudo-imovel">
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
