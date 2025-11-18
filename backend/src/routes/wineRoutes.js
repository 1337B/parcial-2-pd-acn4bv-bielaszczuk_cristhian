import { Router } from 'express';
import {
  getAllWines,
  getWineById,
  createWineHandler,
  updateWineHandler,
  deleteWineHandler
} from '../controllers/wineController.js';
import { validateWine, validateWineUpdate } from '../middlewares/validateWine.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Todas las rutas de vinos requieren autenticación
router.use(authMiddleware);

// GET /api/wines - Obtener todos los vinos
router.get('/', getAllWines);

// GET /api/wines/:id - Obtener un vino por ID
router.get('/:id', getWineById);

// POST /api/wines - Crear un nuevo vino
router.post('/', validateWine, createWineHandler);

// PUT /api/wines/:id - Actualizar un vino
router.put('/:id', validateWineUpdate, updateWineHandler);

// DELETE /api/wines/:id - Eliminar un vino
router.delete('/:id', deleteWineHandler);

export default router;

