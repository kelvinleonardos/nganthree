import { Router } from 'express';
import { getAllUsers, getAdmins } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/admins', getAdmins);

export default router;
