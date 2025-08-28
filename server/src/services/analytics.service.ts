import { Analytics } from '../models/Analytics';

export const trackDocumentView = async (documentId: string, userId: string) => {
    try {
        const analyticsData = await Analytics.create({
            documentId,
            userId,
            action: 'view',
            timestamp: new Date(),
        });
        return analyticsData;
    } catch (error) {
        throw new Error('Error tracking document view: ' + error.message);
    }
};

export const trackDocumentEdit = async (documentId: string, userId: string) => {
    try {
        const analyticsData = await Analytics.create({
            documentId,
            userId,
            action: 'edit',
            timestamp: new Date(),
        });
        return analyticsData;
    } catch (error) {
        throw new Error('Error tracking document edit: ' + error.message);
    }
};

export const getDocumentAnalytics = async (documentId: string) => {
    try {
        const analytics = await Analytics.findAll({
            where: { documentId },
            order: [['timestamp', 'DESC']],
        });
        return analytics;
    } catch (error) {
        throw new Error('Error fetching document analytics: ' + error.message);
    }
};