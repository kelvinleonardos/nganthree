import { Router } from 'express';
import { getAllQueues, createQueue, checkNextNumber, getQueueByUserId, getQueueByAdminId, updateStatus } from '../controllers/queueController.js';

const router = Router();

router.get('/', getAllQueues);
router.post('/create-queue', createQueue);
router.post('/next-number', checkNextNumber);
router.post('/user-queues', getQueueByUserId);
router.post('/admin-queues', getQueueByAdminId);
router.post('/update-status', updateStatus);

export default router;
