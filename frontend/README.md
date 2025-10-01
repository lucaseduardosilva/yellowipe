# Frontend - YellowIpe

Frontend da aplicação YellowIpe desenvolvido com React, TypeScript e Material-UI.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes React
- **Vite** - Bundler moderno para desenvolvimento
- **React Router** - Roteamento para aplicações React
- **Axios** - Cliente HTTP para requisições à API
- **React Context API** - Gerenciamento de estado global
- **Jest** + **Testing Library** - Testes unitários

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── Layout.tsx       # Layout principal da aplicação
│   ├── contexts/            # Contextos React
│   │   └── AuthContext.tsx  # Contexto de autenticação
│   ├── pages/               # Páginas da aplicação
│   │   ├── Feed.tsx         # Página do feed de posts
│   │   ├── Login.tsx        # Página de login
│   │   ├── Profile.tsx      # Página de perfil
│   │   └── Register.tsx     # Página de registro
│   ├── services/            # Serviços de API
│   │   └── api.ts           # Configuração do Axios e serviços
│   ├── types/               # Definições TypeScript
│   │   └── index.ts         # Interfaces e tipos
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Ponto de entrada da aplicação
│   └── index.css            # Estilos globais
├── public/                  # Arquivos estáticos
│   └── favicon.svg          # Favicon personalizado
├── package.json
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração TypeScript
└── env.example              # Exemplo de variáveis de ambiente
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

### Build para produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Modo watch (observa mudanças)
npm run test:watch

# Com coverage
npm run test:coverage
```

## 🎨 Design System

### Cores
- **Primária:** #1976d2 (azul)
- **Texto:** #333333
- **Background:** #ffffff

### Componentes Principais
- **Layout:** Sidebar responsiva com navegação
- **Cards:** Para posts e comentários
- **Formulários:** Login, registro e edição de perfil
- **Botões:** Ações primárias e secundárias
- **Avatares:** Iniciais do nome do usuário

## 📱 Responsividade

- **Mobile First:** Design otimizado para dispositivos móveis
- **Breakpoints Material-UI:**
  - xs: 0px+
  - sm: 600px+
  - md: 900px+
  - lg: 1200px+
  - xl: 1536px+

## 🔒 Autenticação

- **JWT:** Token armazenado no localStorage
- **Context API:** Estado global de autenticação
- **Rotas Protegidas:** Redirecionamento automático para login
- **Interceptors:** Token adicionado automaticamente nas requisições

## 📡 Comunicação com API

- **Axios:** Cliente HTTP configurado
- **Base URL:** Configurável via VITE_API_URL
- **Interceptors:** Para adicionar token e tratar erros
- **Timeout:** 10 segundos para requisições

## 🎯 Funcionalidades

### ✅ Feed
- Listagem de posts com paginação
- Criação de novos posts
- Sistema de likes
- Comentários em posts
- Carregamento otimizado

### ✅ Perfil
- Visualização de dados do usuário
- Edição de nome e bio
- Informações de criação da conta
- Layout responsivo

### ✅ Autenticação
- Login e registro
- Validação de formulários
- Mensagens de erro/sucesso
- Redirecionamento automático

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linter ESLint
npm test             # Executar testes
npm run test:watch   # Testes em modo watch
npm run test:coverage # Testes com coverage
```

## 📦 Dependências Principais

### Produção
- `react` - Biblioteca principal
- `react-dom` - DOM do React
- `react-router-dom` - Roteamento
- `@mui/material` - Componentes Material-UI
- `@mui/icons-material` - Ícones Material-UI
- `axios` - Cliente HTTP
- `typescript` - Tipagem estática

### Desenvolvimento
- `@vitejs/plugin-react` - Plugin React para Vite
- `@types/react` - Tipos TypeScript para React
- `eslint` - Linter de código
- `jest` - Framework de testes
- `@testing-library/react` - Testes de componentes

## 🚀 Deploy

### Vercel/Netlify
1. Execute `npm run build`
2. Deploy da pasta `dist`

---
