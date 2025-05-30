import React, { useState } from 'react';
import './RegistroProprietario.css'; 
import { Link } from 'react-router-dom';

const RegistroProprietario = () => {
    const [formData, setFormData] = useState({
        nome: '',
        razao: '',
        tipo: 'fisico', // valor padrão
        cpfCnpj: '',
        telefone: '',
        telefoneSecundario: '',
        email: '',
        senha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="container">
            <div className="card p-4">

                <div className="modal-area">
                    <div className="top-bar"></div>
                    <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-left">
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                className="form-control"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Nome"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="razao">Razão</label>
                            <input
                                type="text"
                                id="razao"
                                name="razao"
                                className="form-control"
                                value={formData.razao}
                                onChange={handleChange}
                                placeholder="Razão"
                            />
                        </div>


                        <div className="form-group tipo-radio">
                            
                            <div className='radio-buttons'>
                                <label>Tipo:</label>
                                <input
                                    type="radio"
                                    id="FISICO"
                                    name="tipo"
                                    value="FISICO"
                                    checked={formData.tipo === 'FISICO'}
                                    onChange={handleChange}
                                /> Físico
                                <input
                                    type="radio"
                                    id="juridico"
                                    name="tipo"
                                    value="JURIDICO"
                                    checked={formData.tipo === 'JURIDICO'}
                                    onChange={handleChange}
                                /> Jurídico
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpfCnpj">CPF / CNPJ</label>
                            <input
                                type="text"
                                id="cpfCnpj"
                                name="cpfCnpj"
                                className="form-control"
                                value={formData.cpfCnpj}
                                onChange={handleChange}
                                placeholder="CPF / CNPJ"
                            />
                        </div>




                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                type="tel"
                                id="telefone"
                                name="telefone"
                                className="form-control"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="Telefone"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefoneSecundario">Telefone Secundário</label>
                            <input
                                type="tel"
                                id="telefoneSecundario"
                                name="telefoneSecundario"
                                className="form-control"
                                value={formData.telefoneSecundario}
                                onChange={handleChange}
                                placeholder="Telefone Secundário"
                            />
                        </div>
                    </div>


                     <div className="linha-central"></div>



                    {/* Coluna direita */}
                    <div className="form-right">

                        <div className='NameFormRegister'>
                            <h1>CADASTRO DE</h1>
                            <h1>PROPRIETÁRIO</h1>
                        </div>

                        <form class="form-register-propietario">

                                                    <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                className="form-control"
                                value={formData.senha}
                                onChange={handleChange}
                                placeholder="Senha"
                            />
                        </div>

                        <div className="buttom-register-area">
                            <button type="submit">CADASTRAR</button>
                        </div>

                        </form>

                        <div className='back-to-login-area'>
                            <p className="login-texto">
                            Já possui uma conta? <Link to="/login-proprietario">ENTRAR</Link>
                            </p>  
                        </div>


                    </div>
                </form>
                </div>
                

            </div>
        </div>
    );
};

export default RegistroProprietario;
