import { Router } from 'express';
import wineRoutes from './wineRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/wines', wineRoutes);


export default router;
