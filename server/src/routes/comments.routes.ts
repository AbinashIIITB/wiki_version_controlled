import { Router } from 'express';
import { 
    getComments, 
    addComment, 
    updateComment, 
    deleteComment 
} from '../controllers/comments.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

// Get all comments for a document
router.get('/:documentId', authenticate, getComments);

// Add a new comment to a document
router.post('/:documentId', authenticate, addComment);

// Update an existing comment
router.put('/:commentId', authenticate, updateComment);

// Delete a comment
router.delete('/:commentId', authenticate, deleteComment);

export default router;