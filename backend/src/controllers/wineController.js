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
    const { forceRegenerate } = req.query; // Opción para forzar regeneración

    // Buscar el vino en la base de datos
    const wine = findByIdAndUser(id, userId);

    if (!wine) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    // Importar funciones del modelo de consultas
    const {
      findConsultationByWineId,
      createConsultation,
      markWineAsConsulted
    } = await import('../models/aiConsultationModel.js');

    let aiNotes;
    let fromCache = false;

    // Verificar si ya existe una consulta previa (a menos que se fuerce regenerar)
    if (!forceRegenerate) {
      const existingConsultation = findConsultationByWineId(id);

      if (existingConsultation) {
        console.log(`Usando consulta cacheada para vino ${id}`);
        aiNotes = existingConsultation.ai_response;
        fromCache = true;
      }
    }

    // Si no hay consulta previa o se fuerza regenerar, llamar a la IA
    if (!aiNotes) {
      console.log(`Generando nueva consulta para vino ${id}`);

      // Generar las notas del sommelier usando IA
      const { aiNotes: generatedNotes, prompt, modelUsed, tokensUsed } = await generateSommelierNotes(wine);
      aiNotes = generatedNotes;

      // Guardar la consulta en la tabla de cache
      createConsultation(
        id,
        userId,
        prompt,
        aiNotes,
        modelUsed || 'gpt-4o-mini',
        tokensUsed
      );

      // Marcar el vino como consultado
      markWineAsConsulted(id, userId);

      // Persistir las notas en el campo ai_notes del vino
      updateWine(id, userId, { aiNotes });
    }

    // Obtener el vino actualizado
    const updatedWine = findByIdAndUser(id, userId);

    // Devolver las notas generadas
    res.json({
      data: {
        aiNotes,
        wine: updatedWine,
        fromCache,
        consulted: true
      }
    });
  } catch (error) {
    next(error);
  }
}

