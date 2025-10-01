import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  getPostById, 
  likePost, 
  addComment, 
  deletePost 
} from '../controllers/postController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authenticateToken, createPost);
router.put('/:id/like', authenticateToken, likePost);
router.post('/:id/comments', authenticateToken, addComment);
router.delete('/:id', authenticateToken, deletePost);

export default router;
