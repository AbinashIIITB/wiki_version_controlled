import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { sendNotificationEmail } from '../utils/mailer';

// Create a new notification
export const createNotification = async (req: Request, res: Response) => {
    try {
        const { userId, message } = req.body;
        const notification = await Notification.create({ userId, message });
        sendNotificationEmail(userId, message);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Error creating notification', error });
    }
};

// Get all notifications for a user
export const getUserNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.findAll({ where: { userId } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

// Mark a notification as read
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;
        await Notification.update({ read: true }, { where: { id: notificationId } });
        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error });
    }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;
        await Notification.destroy({ where: { id: notificationId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting notification', error });
    }
};