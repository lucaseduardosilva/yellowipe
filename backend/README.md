# Backend - YellowIpe

Backend da aplicação YellowIpe desenvolvido com Node.js, Express e TypeScript.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript do servidor
- **Express.js** - Framework web minimalista
- **TypeScript** - Superset JavaScript com tipagem estática
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação stateless
- **Joi** - Validação de dados
- **Bcryptjs** - Hash de senhas
- **Jest** - Framework de testes
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/              # Configurações
│   │   └── database.ts      # Conexão com MongoDB
│   ├── controllers/         # Controladores das rotas
│   │   ├── authController.ts # Autenticação (login/registro)
│   │   ├── postController.ts # Posts (CRUD, likes, comentários)
│   │   └── userController.ts # Usuários (perfil)
│   ├── middleware/          # Middlewares personalizados
│   │   └── auth.ts          # Middleware de autenticação JWT
│   ├── models/              # Modelos do MongoDB
│   │   ├── User.ts          # Schema do usuário
│   │   └── Post.ts          # Schema do post
│   ├── routes/              # Definição das rotas
│   │   ├── auth.ts          # Rotas de autenticação
│   │   ├── posts.ts         # Rotas de posts
│   │   └── users.ts         # Rotas de usuários
│   ├── utils/               # Utilitários
│   │   └── validation.ts    # Schemas de validação Joi
│   ├── __tests__/           # Testes
│   │   ├── setup.ts         # Configuração dos testes
│   │   └── auth.test.ts     # Testes de autenticação
│   └── index.ts             # Arquivo principal
├── dist/                    # Código compilado (JavaScript)
├── package.json
├── tsconfig.json            # Configuração TypeScript
├── jest.config.js           # Configuração Jest
└── env.example              # Exemplo de variáveis de ambiente
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
cp env.example .env
```

### Configuração do ambiente (.env)

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=sua-chave-secreta-super-segura
MONGODB_URI=mongodb://localhost:27017/yellowipe
MONGODB_TEST_URI=mongodb://localhost:27017/yellowipe_test
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

O servidor estará disponível em: http://localhost:3001

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Modo watch (observa mudanças)
npm run test:watch

# Com coverage
npm run test:coverage
```

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastrar usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/profile` - Obter perfil (protegido)

### Usuários
- `PUT /api/users/profile` - Atualizar perfil (protegido)
- `GET /api/users/:id` - Obter usuário por ID

### Posts
- `GET /api/posts` - Listar posts (com paginação)
- `GET /api/posts/:id` - Obter post por ID
- `POST /api/posts` - Criar post (protegido)
- `PUT /api/posts/:id/like` - Curtir/descurtir post (protegido)
- `POST /api/posts/:id/comments` - Comentar post (protegido)
- `DELETE /api/posts/:id` - Deletar post (protegido)

## 🗄️ Banco de Dados

### Modelos

#### User
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (único),
  password: string (hasheada),
  bio?: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Post
```typescript
{
  _id: ObjectId,
  author: ObjectId (ref: User),
  content: string,
  likes: ObjectId[] (ref: User),
  comments: [{
    _id: ObjectId,
    author: ObjectId (ref: User),
    content: string,
    createdAt: Date,
    updatedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Segurança

### Autenticação JWT
- **Expiração:** 7 dias
- **Algoritmo:** HS256
- **Payload:** { userId: string, iat: number, exp: number }

### Hash de Senhas
- **Biblioteca:** bcryptjs
- **Salt Rounds:** 12
- **Função:** comparePassword para verificação

### Validação
- **Biblioteca:** Joi
- **Schemas:** register, login, post, comment, updateProfile
- **Mensagens:** Personalizadas em português

## 🛡️ Middlewares

### Autenticação
- Verifica token JWT no header `Authorization`
- Adiciona dados do usuário em `req.user`
- Protege rotas privadas

### CORS
- Configurado para aceitar `localhost:5173`
- Headers de controle de acesso

### Tratamento de Erros
- Middleware global de erro
- Respostas padronizadas
- Logs de erro no console

## 📈 Performance

### MongoDB
- **Índices:** email (único), createdAt (posts)
- **Populate:** Author em posts e comentários
- **Paginação:** skip/limit para posts

### Conexão
- **Pool de Conexões:** Configurado automaticamente
- **Reconexão:** Automática em caso de falha

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento com nodemon
npm run build        # Compilar TypeScript para JavaScript
npm start            # Executar versão compilada
npm test             # Executar testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com coverage
```

## 📦 Dependências Principais

### Produção
- `express` - Framework web
- `mongoose` - ODM para MongoDB
- `jsonwebtoken` - JWT
- `bcryptjs` - Hash de senhas
- `joi` - Validação de dados
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Variáveis de ambiente

### Desenvolvimento
- `typescript` - Tipagem estática
- `nodemon` - Auto-reload em desenvolvimento
- `jest` - Framework de testes
- `@types/*` - Tipos TypeScript
- `ts-jest` - Jest para TypeScript

## 🧪 Testes

### Configuração
- **Database de Teste:** Separada da produção
- **Setup/Teardown:** Automático
- **Coverage:** Relatórios detalhados

### Estrutura
- `setup.ts` - Configuração global
- `auth.test.ts` - Testes de autenticação
- Mocks para dependências externas

## 🚀 Deploy

### Heroku/Railway/Vercel
1. Configure as variáveis de ambiente
2. `npm run build`
3. `npm start`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Variáveis de Ambiente (Produção)
```env
PORT=3001
NODE_ENV=production
JWT_SECRET=chave-super-secreta-producao
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/yellowipe
```

## 📊 Monitoramento

### Logs
- **Desenvolvimento:** Console detalhado
- **Produção:** Logs estruturados
- **Erros:** Stack traces completos

### Health Check
```bash
GET /health
```

---
