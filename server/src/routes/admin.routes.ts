import { Router } from 'express';
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    getRoles 
} from '../controllers/admin.controller';
import { verifyToken, isAdmin } from '../middleware/auth';

const router = Router();

// Get all users
router.get('/users', [verifyToken, isAdmin], getAllUsers);

// Get user by ID
router.get('/users/:id', [verifyToken, isAdmin], getUserById);

// Create a new user
router.post('/users', [verifyToken, isAdmin], createUser);

// Update user by ID
router.put('/users/:id', [verifyToken, isAdmin], updateUser);

// Delete user by ID
router.delete('/users/:id', [verifyToken, isAdmin], deleteUser);

// Get all roles
router.get('/roles', [verifyToken, isAdmin], getRoles);

export default router;