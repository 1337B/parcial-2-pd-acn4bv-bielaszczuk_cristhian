import { Router } from 'express';
import wineRoutes from './wineRoutes.js';

const router = Router();

// Montar rutas de vinos
router.use('/wines', wineRoutes);

// Placeholder for future route modules
// router.use('/auth', authRouter);

export default router;
