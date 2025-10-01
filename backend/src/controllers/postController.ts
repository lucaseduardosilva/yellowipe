import { Request, Response } from 'express';
import Post from '../models/Post';
import { postSchema, commentSchema } from '../utils/validation';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const user = (req as any).user;
    const { content } = req.body;

    const post = new Post({
      author: user._id,
      content
    });

    await post.populate('author', 'name');
    await post.save();

    res.status(201).json({
      message: 'Post criado com sucesso',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'name')
      .populate('comments.author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments();

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate('author', 'name')
      .populate('comments.author', 'name');

    if (!post) {
      res.status(404).json({ message: 'Post não encontrado' });
      return;
    }

    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: 'Post não encontrado' });
      return;
    }

    const isLiked = post.likes.includes(user._id);
    
    if (isLiked) {
      post.likes = post.likes.filter(likeId => !likeId.equals(user._id));
    } else {
      post.likes.push(user._id);
    }

    await post.save();
    await post.populate('author', 'name');
    await post.populate('comments.author', 'name');

    res.json({
      message: isLiked ? 'Like removido' : 'Post curtido',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = commentSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { id } = req.params;
    const user = (req as any).user;
    const { content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: 'Post não encontrado' });
      return;
    }

    post.comments.push({
      author: user._id,
      content
    } as any);

    await post.save();
    await post.populate('author', 'name');
    await post.populate('comments.author', 'name');

    res.status(201).json({
      message: 'Comentário adicionado com sucesso',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: 'Post não encontrado' });
      return;
    }

    if (!post.author.equals(user._id)) {
      res.status(403).json({ message: 'Você não tem permissão para deletar este post' });
      return;
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
