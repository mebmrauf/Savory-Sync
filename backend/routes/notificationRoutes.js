import express from 'express';
import {
    getNotifications,
    markAsRead,
    deleteNotification,
} from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateNotificationId } from '../middlewares/validationMiddleware.js'; // Import validation

const router = express.Router();

// Get all notifications for the authenticated user
router.get('/', authMiddleware, getNotifications);

// Mark a notification as read
router.put('/:notificationId/read', authMiddleware, validateNotificationId, markAsRead);

// Delete a notification
router.delete('/:notificationId', authMiddleware, validateNotificationId, deleteNotification);

export default router;