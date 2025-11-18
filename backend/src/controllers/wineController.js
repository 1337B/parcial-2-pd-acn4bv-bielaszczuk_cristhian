import {
  findAllByUserId,
  createWine,
  findByIdAndUser,
  updateWine,
  deleteWine
} from '../models/wineModel.js';
import { generateSommelierNotes } from '../services/aiService.js';

/**
 * Obtiene todos los vinos del usuario
 * @route GET /api/wines
 */
export async function getAllWines(req, res, next) {
  try {
    const userId = req.user.id;

    const wines = findAllByUserId(userId);

    res.json({ data: wines });
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene un vino específico por ID
 * @route GET /api/wines/:id
 */
export async function getWineById(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const wine = findByIdAndUser(id, userId);

    if (!wine) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    res.json({ data: wine });
  } catch (error) {
    next(error);
  }
}

/**
 * Crea un nuevo vino
 * @route POST /api/wines
 */
export async function createWineHandler(req, res, next) {
  try {
    const userId = req.user.id;

    const wineData = {
      name: req.body.name,
      winery: req.body.winery,
      grape: req.body.grape,
      year: req.body.year,
      country: req.body.country,
      region: req.body.region,
      place: req.body.place,
      rating: req.body.rating,
      aromas: req.body.aromas,
      flavors: req.body.flavors,
      notes: req.body.notes,
      imageUrl: req.body.imageUrl
    };

    const newWine = createWine(userId, wineData);

    res.status(201).json({ data: newWine });
  } catch (error) {
    next(error);
  }
}

/**
 * Actualiza un vino existente
 * @route PUT /api/wines/:id
 */
export async function updateWineHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const partialData = {
      name: req.body.name,
      winery: req.body.winery,
      grape: req.body.grape,
      year: req.body.year,
      country: req.body.country,
      region: req.body.region,
      place: req.body.place,
      rating: req.body.rating,
      aromas: req.body.aromas,
      flavors: req.body.flavors,
      notes: req.body.notes,
      imageUrl: req.body.imageUrl,
      aiNotes: req.body.aiNotes
    };

    Object.keys(partialData).forEach(key => {
      if (partialData[key] === undefined) {
        delete partialData[key];
      }
    });

    const updatedWine = updateWine(id, userId, partialData);

    if (!updatedWine) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    res.json({ data: updatedWine });
  } catch (error) {
    next(error);
  }
}

/**
 * Elimina un vino
 * @route DELETE /api/wines/:id
 */
export async function deleteWineHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deleted = deleteWine(id, userId);

    if (!deleted) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    res.json({ message: 'Wine deleted successfully' });
  } catch (error) {
    next(error);
  }
}

/**
 * Consulta con SommelIAr - Genera notas de sommelier para un vino
 * @route POST /api/wines/:id/sommelier
 */
export async function getSommelierNotes(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Buscar el vino en la base de datos
    const wine = findByIdAndUser(id, userId);

    if (!wine) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    // Generar las notas del sommelier usando los datos reales del vino
    const aiNotes = generateSommelierNotes(wine);

    // Opcional: Persistir las notas generadas en la base de datos
    // Esto permite recuperarlas más tarde sin tener que regenerarlas
    const updatedWine = updateWine(id, userId, { aiNotes });

    // Devolver las notas generadas
    res.json({
      data: {
        aiNotes,
        wine: updatedWine
      }
    });
  } catch (error) {
    next(error);
  }
}

