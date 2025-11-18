import { Router } from 'express';
import wineRoutes from './wineRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

// Montar rutas de autenticación
router.use('/auth', authRoutes);

// Montar rutas de vinos
router.use('/wines', wineRoutes);


export default router;
