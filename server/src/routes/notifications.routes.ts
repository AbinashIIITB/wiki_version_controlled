import { Router } from 'express';
import { getNotifications, createNotification, deleteNotification } from '../controllers/notifications.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

// Get all notifications for a user
router.get('/', authenticate, getNotifications);

// Create a new notification
router.post('/', authenticate, createNotification);

// Delete a notification
router.delete('/:id', authenticate, authorize('Admin'), deleteNotification);

export default router;