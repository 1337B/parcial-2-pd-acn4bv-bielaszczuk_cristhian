import { Router } from 'express';
import { register, login } from '../controllers/authController.js';

const router = Router();

// POST /api/auth/register - Registro de usuario
router.post('/register', register);

// POST /api/auth/login - Login de usuario
router.post('/login', login);

export default router;

