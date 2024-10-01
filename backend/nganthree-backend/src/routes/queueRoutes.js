import { Router } from 'express';
import { getAllQueues, createQueue } from '../controllers/queueController.js';

const router = Router();

router.get('/', getAllQueues);
router.post('/', createQueue);

export default router;
