import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { registerSchema, loginSchema } from '../utils/validation';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Usuário já existe com este email' });
      return;
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Credenciais inválidas' });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
