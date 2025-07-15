# Meu_Condominio_Front-end

O **Meu Condomínio** é uma plataforma completa para a gestão de aluguéis e imóveis, voltada para **proprietários, inquilinos e administradores**. O sistema facilita a administração de contratos, ocorrências, despesas e agendamentos, garantindo mais organização e eficiência.

Com o **Meu Condomínio**, **proprietários** podem cadastrar imóveis, gerenciar contratos, acompanhar pagamentos e registrar ocorrências. **Inquilinos** têm acesso a informações sobre o aluguel, podem solicitar manutenções e monitorar suas despesas. Além disso, o sistema oferece uma **dashboard financeira**, proporcionando uma visão detalhada dos gastos do condomínio e relatórios estratégicos para auxiliar na tomada de decisões.

O objetivo do **Meu Condomínio** é **automatizar processos, aumentar a transparência e melhorar a comunicação** entre todas as partes envolvidas na administração de imóveis alugados.



## 🚀 Tecnologias Utilizadas

- **React** (Componente baseado)
- **React Router** (Navegação entre páginas)
- **Redux** ou **Context API** (Gerenciamento de estado)
- **Axios** (Requisições HTTP para o backend)
- **JWT** (Autenticação baseada em tokens)
- **CSS / SASS** (Estilos)
- **React Bootstrap** (Componentes prontos de UI)

## 🔐 Funcionalidades

- **Autenticação**: Login de usuários com JWT, com diferenciação entre proprietários e moradores.
- **Gerenciamento de Imóveis**: Cadastro, edição e listagem de imóveis.
- **Agendamentos**: Criação, edição e listagem de agendamentos.
- **Dashboard**: Páginas exclusivas para proprietários e moradores, com funcionalidades de gerenciamento específicas para cada tipo de usuário.

## 📦 Endpoints Principais Consumidos

- **Autenticação**
  - **POST /auth/login**: Realiza o login e retorna o token JWT.

- **Usuários**
  - **GET /usuario/{id}**: Buscar usuário por ID.

- **Imóvel**
  - **POST /imovel**: Cadastro de imóvel.
  - **GET /imovel**: Listagem de imóveis.
  - **PUT /imovel/{id}**: Atualiza informações do imóvel.
  - **DELETE /imovel/{id}**: Deleta imóvel.

- **Agendamento**
  - **POST /agendamento**: Criar agendamento.
  - **GET /agendamento**: Listar agendamentos.
  - **PUT /agendamento/{id}**: Atualizar agendamento.
  - **DELETE /agendamento/{id}**: Deletar agendamento.

## 📌 Como Executar

### Pré-requisitos
- **Uma IDEA, por exemplo VS Code**
- **Configurar o back-end**
- **PostgreSQL** ou outro banco de dados configurado

### Passos


# Clone o projeto
```bash
git clone https://github.com/seuusuario/backend-meu-condominio.git
cd React-Project
```

# Compile o projeto
```bash
npm install vite
npm install react-icons
```
# Execute o projeto
```bash
npm run dev
```
