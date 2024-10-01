import { Router } from 'express';
import { getAllStatuses, createStatus } from '../controllers/statusController.js';

const router = Router();

router.get('/', getAllStatuses);
router.post('/', createStatus);

export default router;
