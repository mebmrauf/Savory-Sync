import Notification from '../models/Notification.js';

// Create a new notification
export const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({
            userId,
            message,
        });
        await notification.save();
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    const { userId } = req.user;

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        await notification.remove();
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
};