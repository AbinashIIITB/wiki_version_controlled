import { Router } from 'express';
import {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentVersions,
} from '../controllers/documents.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

// Route to create a new document
router.post('/', authenticate, authorize('Admin', 'Editor'), createDocument);

// Route to get a specific document by ID
router.get('/:id', authenticate, getDocument);

// Route to update a specific document by ID
router.put('/:id', authenticate, authorize('Admin', 'Editor'), updateDocument);

// Route to delete a specific document by ID
router.delete('/:id', authenticate, authorize('Admin'), deleteDocument);

// Route to get all documents
router.get('/', authenticate, getAllDocuments);

// Route to get versions of a specific document
router.get('/:id/versions', authenticate, getDocumentVersions);

export default router;