import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth';
import { connectDatabase } from '../config/database';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  describe('POST /auth/register', () => {
    it('deve registrar um novo usuário com dados válidos', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('Usuário criado com sucesso');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
      expect(response.body.user.password).toBeUndefined();
    });

    it('deve retornar erro ao tentar registrar usuário com email duplicado', async () => {
      const userData = {
        name: 'Maria Santos',
        email: 'joao@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBe('Usuário já existe com este email');
    });

    it('deve retornar erro ao registrar com dados inválidos', async () => {
      const userData = {
        name: '',
        email: 'email-invalido',
        password: '123'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('Nome é obrigatório');
    });
  });

  describe('POST /auth/login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const credentials = {
        email: 'joao@test.com',
        password: '123456'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.message).toBe('Login realizado com sucesso');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe(credentials.email);
    });

    it('deve retornar erro com credenciais inválidas', async () => {
      const credentials = {
        email: 'joao@test.com',
        password: 'senha-errada'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(credentials)
        .expect(400);

      expect(response.body.message).toBe('Credenciais inválidas');
    });
  });
});
