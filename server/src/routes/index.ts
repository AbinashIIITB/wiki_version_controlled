import { Router } from 'express';
import authRoutes from './auth.routes';
import documentRoutes from './documents.routes';
import commentRoutes from './comments.routes';
import versionRoutes from './versions.routes';
import tagRoutes from './tags.routes';
import notificationRoutes from './notifications.routes';
import searchRoutes from './search.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/comments', commentRoutes);
router.use('/versions', versionRoutes);
router.use('/tags', tagRoutes);
router.use('/notifications', notificationRoutes);
router.use('/search', searchRoutes);
router.use('/admin', adminRoutes);

export default router;
