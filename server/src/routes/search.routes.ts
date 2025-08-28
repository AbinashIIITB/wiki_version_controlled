import { Router } from 'express';
import { searchDocuments } from '../controllers/search.controller';

const router = Router();

// Route for searching documents
router.get('/documents', searchDocuments);

export default router;