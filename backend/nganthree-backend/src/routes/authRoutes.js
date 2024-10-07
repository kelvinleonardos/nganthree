import { Router } from 'express';
import { register, login, verifyToken, currentUser } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-token', verifyToken);
router.post('/current-user', currentUser);

export default router;
