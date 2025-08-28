import { Router } from 'express';
import { getAllVersions, getVersionById, createVersion, updateVersion, deleteVersion } from '../controllers/versions.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

// Get all versions for a document
router.get('/:documentId', authenticate, getAllVersions);

// Get a specific version by ID
router.get('/:documentId/:versionId', authenticate, getVersionById);

// Create a new version
router.post('/:documentId', authenticate, authorize('Editor', 'Admin'), createVersion);

// Update an existing version
router.put('/:documentId/:versionId', authenticate, authorize('Editor', 'Admin'), updateVersion);

// Delete a version
router.delete('/:documentId/:versionId', authenticate, authorize('Admin'), deleteVersion);

export default router;