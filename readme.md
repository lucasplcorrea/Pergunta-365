
# 📊 Projeto de Enquetes Simplificadas

[![Node.js](https://img.shields.io/badge/Node.js-16.0.0-green)](https://nodejs.org/) 
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13.0-blue)](https://www.postgresql.org/) 
[![Swagger](https://img.shields.io/badge/Swagger-UI-green)](https://swagger.io/)
[![Express](https://img.shields.io/badge/Express-4.17.1-lightgrey)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-JSONWebToken-orange)](https://jwt.io/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.6.5-lightblue)](https://sequelize.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## 📝 **Descrição**
Este é um projeto de enquetes simplificadas onde criadores podem adicionar questionários com perguntas e estudantes podem respondê-las. O sistema garante o controle de acesso através de permissões, e toda a documentação da API é gerada via Swagger.

## 🚀 **Funcionalidades Principais**
1. **Gerenciamento de Usuários**:
   - CRUD completo de usuários com permissões de *criador* ou *estudante*.

2. **Questionários**:
   - Criadores podem criar, atualizar e deletar questionários, bem como adicionar perguntas.

3. **Respostas**:
   - Estudantes podem responder perguntas de um questionário.

4. **Autenticação JWT**:
   - Inclusão de permissões no payload do token JWT para controle de acesso.

5. **Documentação com Swagger**:
   - A API é completamente documentada para facilitar o consumo de terceiros.

---

## 📑 **Tabelas do Banco de Dados**

| Tabela            | Descrição                                       |
|-------------------|-------------------------------------------------|
| **Usuarios**       | Informações dos usuários, como nome e senha.    |
| **Permissões**     | Tabelas para controle de permissões de usuário. |
| **Questionários**  | Tabela de questionários criados por usuários.   |
| **Perguntas**      | Contém as perguntas associadas aos questionários.|
| **Respostas**      | Respostas dos estudantes às perguntas.          |

---

## 🛠️ **Tecnologias Utilizadas**

- **Node.js**: Ambiente de execução para JavaScript no backend.
- **Express.js**: Framework web para Node.js.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **Sequelize**: ORM para interagir com o banco de dados.
- **JWT (JSON Web Tokens)**: Para autenticação e controle de acesso.
- **Swagger**: Para documentação automática da API.
- **Yup**: Biblioteca de validação de schema.

---

## 🏗️ **Estrutura de Pastas**
```bash
/src
  /controllers
    UsuarioController.js
    QuestionarioController.js
    RespostaController.js
  /models
    Usuario.js
    Permissao.js
    Questionario.js
    Pergunta.js
    Resposta.js
  /routes
    usuarios.js
    questionarios.js
    respostas.js
  /middlewares
    autenticacaoJWT.js
    verificarPermissao.js
  /migrations
    create-tabelas.js
  /config
    database.js
  /docs
    swagger.js
```

---

## 📝 **Como Rodar o Projeto Localmente**

### 1. Clone o repositório:
```bash
git clone https://github.com/lucasplcorrea/Pergunta-365.git
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure o banco de dados PostgreSQL:
Crie um arquivo `.env` com as variáveis de ambiente do banco de dados:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

### 4. Execute as migrations:
```bash
npx sequelize-cli db:migrate
```

### 5. Inicie o servidor:
```bash
npm start
```

### 6. Acesse o Swagger para ver a documentação:
```bash
http://localhost:3000/api-docs
```

---

## 🛡️ **Autenticação e Permissões**
- Criadores têm permissão para criar, editar e deletar questionários.
- Estudantes podem responder a questionários, mas não podem criá-los ou editá-los.

**Middleware de Controle de Acesso**:
- A API verifica as permissões do usuário no token JWT, garantindo que apenas usuários autorizados possam acessar determinados recursos.

---

## 🔧 **Pacotes Importantes**
- `express`
- `jsonwebtoken`
- `bcryptjs`
- `sequelize`
- `pg`
- `swagger-jsdoc`
- `swagger-ui-express`
- `yup`
- `dotenv`

---

## 🏅 **Desenvolvido Por**
- [Lucas Pedro](https://github.com/lucasplcorrea)
