import { Router } from 'express';
import { getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllUsers);

export default router;
