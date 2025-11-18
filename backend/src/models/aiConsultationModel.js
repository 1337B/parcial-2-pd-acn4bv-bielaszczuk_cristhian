import crypto from 'crypto';
import { getDatabase } from '../database/db.js';

/**
 * Busca una consulta de IA existente para un vino
 * @param {string} wineId - ID del vino
 * @returns {Object|null} Consulta encontrada o null
 */
export function findConsultationByWineId(wineId) {
  const db = getDatabase();
  const query = `SELECT * FROM wine_ai_consultations WHERE wine_id = ? ORDER BY consulted_at DESC LIMIT 1`;
  const consultation = db.prepare(query).get(wineId);
  return consultation || null;
}

/**
 * Crea una nueva consulta de IA
 * @param {string} wineId - ID del vino
 * @param {string} userId - ID del usuario
 * @param {string} promptSent - Prompt enviado a la IA
 * @param {string} aiResponse - Respuesta de la IA
 * @param {string} modelUsed - Modelo usado (ej: gpt-4o-mini)
 * @param {number} tokensUsed - Tokens consumidos (opcional)
 * @returns {Object} Consulta creada
 */
export function createConsultation(wineId, userId, promptSent, aiResponse, modelUsed, tokensUsed = null) {
  const db = getDatabase();
  const id = crypto.randomUUID();
  const consultedAt = new Date().toISOString();

  const query = `
    INSERT INTO wine_ai_consultations 
    (id, wine_id, user_id, prompt_sent, ai_response, model_used, tokens_used, consulted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.prepare(query).run(
    id,
    wineId,
    userId,
    promptSent,
    aiResponse,
    modelUsed,
    tokensUsed,
    consultedAt
  );

  return {
    id,
    wineId,
    userId,
    promptSent,
    aiResponse,
    modelUsed,
    tokensUsed,
    consultedAt
  };
}

/**
 * Marca un vino como consultado con IA
 * @param {string} wineId - ID del vino
 * @param {string} userId - ID del usuario
 */
export function markWineAsConsulted(wineId, userId) {
  const db = getDatabase();
  const query = `
    UPDATE wines 
    SET ai_consulted = 1, updated_at = ?
    WHERE id = ? AND user_id = ?
  `;

  db.prepare(query).run(new Date().toISOString(), wineId, userId);
}

/**
 * Verifica si un vino ya fue consultado con IA
 * @param {string} wineId - ID del vino
 * @returns {boolean} True si ya fue consultado
 */
export function isWineConsulted(wineId) {
  const db = getDatabase();
  const query = `SELECT ai_consulted FROM wines WHERE id = ?`;
  const result = db.prepare(query).get(wineId);
  return result && result.ai_consulted === 1;
}

