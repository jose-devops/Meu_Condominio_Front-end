import React, { useState, useEffect } from 'react';
import './modal.css'; // Certifique-se que o CSS correto está sendo importado
import {
  listarEspecialidade,
  cadastrarPrestador,
  editarPrestador,

} from '../../../api/Proprietario-Api/PrestadoresService';


export default function ModalPrestador({ prestador, onClose, onSalvar }) {
  const [especialidades, setEspecialidades] = useState([]);


  const [formData, setFormData] = useState({
    razao: '',
    cpfCnpj: '',
    telefone1: '',
    telefone2: '',
    linkWhatsapp: '',
    especialidade: '',
    observacao: ''
  });

  useEffect(() => {
  async function carregarEspecialidades() {
    try {
      const data = await listarEspecialidade();
      setEspecialidades(data);
    } catch (error) {
      console.error("Erro ao carregar especialidades:", error);
    }
  }

  carregarEspecialidades();
}, []);

  // Preenche o formulário se um prestador existente for passado (modo edição)
  useEffect(() => {
    if (prestador) {
      setFormData({
        razao: prestador.razao || '',
        cpfCnpj: prestador.cpfCnpj || '',
        telefone1: prestador.telefonePrincipal || '',  // aqui
        telefone2: prestador.telefoneSecundario || '',
        linkWhatsapp: prestador.linkWhatsapp || '', // Adicionar se existir no modelo de dados
        especialidade: prestador.especialidade || prestador.profissao || '', // aqui
        observacao: prestador.observacao || '' // Adicionar se existir no modelo de dados
      });
    }
  }, [prestador]);

  // Atualiza o estado do formulário quando um campo muda
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



const handleSalvarPrestador = async () => {
  const { razao, cpfCnpj, telefone1, telefone2, linkWhatsapp, especialidade, observacao } = formData;
  const novosErros = {};

  if (!razao.trim()) novosErros.razao = "Razão é obrigatória";
  if (!cpfCnpj.trim()) novosErros.cpfCnpj = "CPF / CNPJ é obrigatório";
  if (!telefone1.trim()) novosErros.telefone1 = "Telefone Principal é obrigatório";
  if (!especialidade.trim()) novosErros.especialidade = "Especialidade é obrigatória";

  if (Object.keys(novosErros).length > 0) {
    setErros(novosErros);
    return;
  }

  const dados = {
    razao,
    cpfCnpj,
    telefonePrincipal: telefone1,
    telefoneSecundario: telefone2,
    linkWhatsapp,
    especialidade,
    observacao
  };

  try {
    if (prestador) {
      await editarPrestador({ ...dados, id: prestador.id }); // Se ainda for implementar edição
      onSalvar({ tipo: "sucesso", mensagem: "Prestador atualizado com sucesso!" });
    } else {
      await cadastrarPrestador(dados);
      onSalvar({ tipo: "sucesso", mensagem: "Prestador cadastrado com sucesso!" });
    }
    onClose();
  } catch (error) {
    console.error(error);
    onSalvar({ tipo: "erro", mensagem: "Erro ao salvar o Prestador." });
  }
};






  

  return (
    <div className="modal-fundo" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-prestador">
        <div className='modal-prestador-area'>

          <div className='modal-prestador-header'>
            <h1>PRESTADOR</h1>
            <button className="close-button" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

        </div>

          <div className="modal-form-prestador">

            <div className="row-form-prestador">

              <div className="form-group-prestador">
              
                <input 
                  type="text" 
                  name="razao" 
                  placeholder="Razão" 
                  value={formData.razao}
                  onChange={handleChange} 
                />
              </div>


              <div className="form-group-prestador">
                <input 
                  type="text" 
                  name="cpfCnpj" 
                  placeholder="CPF / CNPJ" 
                  value={formData.cpfCnpj}
                  onChange={handleChange}

                />
              </div>


            </div>

            <div className="row-form-prestador">
              <div className="form-group-prestador">
                <input 
                  type="tel" // Usar type="tel" para telefones
                  name="telefone1" 
                  placeholder="Telefone principal" 
                  value={formData.telefone1}
                  onChange={handleChange}
               
                />
              </div>
              <div className="form-group-prestador">
                <input 
                  type="tel" 
                  name="telefone2" 
                  placeholder="Telefone secundário" 
                  value={formData.telefone2}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row-form-prestador">
              <div className="form-group-prestador">
                <input 
                  type="text" // Poderia ser type="url" se for um link completo
                  name="linkWhatsapp" 
                  placeholder="Instagram" 
                  value={formData.linkWhatsapp}
                  onChange={handleChange}
                />
              </div>
                <div className="form-group-prestador">
                  <select 
                    name="especialidade" 
                    value={formData.especialidade}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Especialidade</option>
                    {especialidades.map(esp => (
                      <option key={esp} value={esp}>{esp}</option> 
                    ))}
                  </select>
                </div>
            </div>

            <div className="row-form-prestador">
              <div className="form-group-prestador full-width">
                <textarea 
                  name="observacao" 
                  placeholder="Observação" 
                  rows="4" // Ajuste a altura conforme necessário
                  value={formData.observacao}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>



          <div className="buttons-prestador-form">
            <div className='botoes-prestador'>

            <button type="button" className="btn-cadastrar" onClick={handleSalvarPrestador}>
              {prestador ? 'SALVAR' : 'CADASTRAR'}
            </button>
            <button type="button" className="btn-cancelar" onClick={onClose}>CANCELAR</button>
          
            </div>
          </div>
      </div>
    </div>
  );
}
