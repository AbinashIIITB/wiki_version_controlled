import { Notification } from '../models/Notification';
import { User } from '../models/User';

export class NotificationService {
    async createNotification(userId: string, message: string): Promise<Notification> {
        const notification = await Notification.create({ userId, message });
        return notification;
    }

    async getUserNotifications(userId: string): Promise<Notification[]> {
        const notifications = await Notification.findAll({ where: { userId } });
        return notifications;
    }

    async markAsRead(notificationId: string): Promise<void> {
        await Notification.update({ read: true }, { where: { id: notificationId } });
    }

    async deleteNotification(notificationId: string): Promise<void> {
        await Notification.destroy({ where: { id: notificationId } });
    }
}