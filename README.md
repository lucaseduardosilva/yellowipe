# YellowIpe - Rede Social

Uma aplicação web moderna de rede social com autenticação, feed de postagens e interação entre usuários.

## 🚀 Tecnologias

### Backend
- **Node.js** com **Express** e **TypeScript**
- **MongoDB** com **Mongoose**
- **JWT** para autenticação
- **Jest** para testes
- **Joi** para validação
- **Bcryptjs** para hash de senhas

### Frontend
- **React 18** com **TypeScript**
- **Vite** como bundler
- **Material-UI (MUI)** para estilização
- **React Router** para navegação
- **Axios** para requisições HTTP
- **React Context API** para gerenciamento de estado
- **Jest** e **Testing Library** para testes

## 📋 Funcionalidades

### ✅ Autenticação
- Cadastro de usuário com validação
- Login com JWT
- Proteção de rotas privadas
- Middleware de autenticação

### ✅ Feed
- Listagem de postagens públicas
- Criação de nova postagem
- Sistema de likes
- Comentários em postagens
- Paginação de posts

### ✅ Perfil
- Visualização do perfil do usuário
- Edição de dados básicos (nome, bio)
- Informações de criação da conta

### ✅ Interações
- Curtir/descurtir posts
- Comentar em posts
- Deletar próprios posts
- Visualização de outros usuários

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- MongoDB (local ou cloud)
- npm ou yarn

### 1. Clone o repositório
\`\`\`bash
git clone <url-do-repositorio>
cd yellowipe
\`\`\`

### 2. Configure o Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Crie um arquivo `.env` baseado no `env.example`:
\`\`\`bash
cp env.example .env
\`\`\`

Configure as variáveis:
\`\`\`
PORT=3001
NODE_ENV=development
JWT_SECRET=sua-chave-secreta-super-segura
MONGODB_URI=mongodb://localhost:27017/yellowipe
\`\`\`

### 3. Configure o Frontend

\`\`\`bash
cd ../frontend
npm install
\`\`\`

### 4. Execute a aplicação

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API: http://localhost:3001/api

## 🧪 Testes

### Backend
\`\`\`bash
cd backend
npm test              # Executar todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Com coverage
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm test              # Executar todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Com coverage
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
yellowipe/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (database)
│   │   ├── controllers/     # Controladores das rotas
│   │   ├── middleware/      # Middlewares (auth)
│   │   ├── models/          # Modelos do MongoDB
│   │   ├── routes/          # Definição das rotas
│   │   ├── utils/           # Utilitários (validação)
│   │   ├── __tests__/       # Testes do backend
│   │   └── index.ts         # Arquivo principal
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # Contextos React (Auth)
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   ├── types/           # Definições TypeScript
│   │   ├── __tests__/       # Testes do frontend
│   │   └── App.tsx          # Componente principal
│   ├── public/              # Arquivos estáticos (favicon)
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
\`\`\`

## 🔒 Segurança

- Senhas são hasheadas com bcrypt (salt rounds: 12)
- JWT com expiração de 7 dias
- Validação de dados com Joi
- Sanitização de inputs
- CORS configurado
- Helmet para headers de segurança

## 🎨 Design

- Interface moderna e responsiva
- Design system com Material-UI
- Cores primárias personalizadas (azul e amarelo)
- Componentes reutilizáveis
- UX otimizada para mobile e desktop

## 📊 API Endpoints

### Autenticação
- \`POST /api/auth/register\` - Cadastrar usuário
- \`POST /api/auth/login\` - Fazer login
- \`GET /api/auth/profile\` - Obter perfil (protegido)

### Usuários
- \`PUT /api/users/profile\` - Atualizar perfil (protegido)
- \`GET /api/users/:id\` - Obter usuário por ID

### Posts
- \`GET /api/posts\` - Listar posts (com paginação)
- \`GET /api/posts/:id\` - Obter post por ID
- \`POST /api/posts\` - Criar post (protegido)
- \`PUT /api/posts/:id/like\` - Curtir/descurtir post (protegido)
- \`POST /api/posts/:id/comments\` - Comentar post (protegido)
- \`DELETE /api/posts/:id\` - Deletar post (protegido)

## 🚀 Deploy

### Backend (Heroku/Railway/Vercel)
1. Configure as variáveis de ambiente
2. \`npm run build\`
3. \`npm start\`

### Frontend (Vercel/Netlify)
1. \`npm run build\`
2. Deploy da pasta \`dist\`

## 📝 Licença

Este projeto é apenas para fins educacionais e de avaliação.

---
