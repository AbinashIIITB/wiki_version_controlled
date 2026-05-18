import { Router } from 'express';
import { createTag, getTags, updateTag, deleteTag } from '../controllers/tags.controller';
import { authenticate as verifyToken } from '../middleware/auth';
import { adminOnly as isAdmin } from '../middleware/roles';

const router = Router();

// Create a new tag
router.post('/', [verifyToken, isAdmin], createTag);

// Get all tags
router.get('/', getTags);

// Update a tag
router.put('/:id', [verifyToken, isAdmin], updateTag);

// Delete a tag
router.delete('/:id', [verifyToken, isAdmin], deleteTag);

export default router;