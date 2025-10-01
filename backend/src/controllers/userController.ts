import { Request, Response } from 'express';
import User from '../models/User';
import { updateProfileSchema } from '../utils/validation';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const user = (req as any).user;
    const { name, bio } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.json({
      id: user._id,
      name: user.name,
      bio: user.bio,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
