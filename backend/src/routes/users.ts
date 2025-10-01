import { Router } from 'express';
import { updateProfile, getUserById } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.put('/profile', authenticateToken, updateProfile);
router.get('/:id', getUserById);

export default router;
