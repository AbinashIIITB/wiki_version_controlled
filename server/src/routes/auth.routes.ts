import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../validators/user.schema';

const router = Router();

// Register route
router.post('/register', validateRegister, register);

// Login route
router.post('/login', validateLogin, login);

// Get current user route
router.get('/current', getCurrentUser);

export default router;