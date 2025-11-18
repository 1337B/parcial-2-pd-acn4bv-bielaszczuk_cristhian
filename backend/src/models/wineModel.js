import crypto from 'crypto';
import { getDatabase } from '../database/db.js';

/**
 * Mapea una fila de la base de datos a un objeto Wine con nombres en camelCase
 */
function mapRowToWine(row) {
  if (!row) return null;

  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    winery: row.winery,
    grape: row.grape,
    year: row.year,
    country: row.country,
    region: row.region,
    place: row.place,
    rating: row.rating,
    aromas: row.aromas,
    flavors: row.flavors,
    notes: row.notes,
    imageUrl: row.image_url,
    aiNotes: row.ai_notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

/**
 * Mapea un objeto Wine con nombres en camelCase a nombres de columna snake_case
 */
function mapWineToColumns(wine) {
  return {
    id: wine.id,
    user_id: wine.userId,
    name: wine.name,
    winery: wine.winery || null,
    grape: wine.grape,
    year: wine.year || null,
    country: wine.country || null,
    region: wine.region || null,
    place: wine.place || null,
    rating: wine.rating || null,
    aromas: wine.aromas || null,
    flavors: wine.flavors || null,
    notes: wine.notes || null,
    image_url: wine.imageUrl || null,
    ai_notes: wine.aiNotes || null,
    created_at: wine.createdAt,
    updated_at: wine.updatedAt
  };
}

/**
 * Obtiene todos los vinos de un usuario ordenados por fecha de creación descendente
 * @param {string} userId - ID del usuario
 * @returns {Array} Array de objetos Wine
 */
export function findAllByUserId(userId) {
  const db = getDatabase();
  const query = `
    SELECT * FROM wines 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;

  const rows = db.prepare(query).all(userId);
  return rows.map(mapRowToWine);
}

/**
 * Busca un vino por ID y usuario
 * @param {string} id - ID del vino
 * @param {string} userId - ID del usuario
 * @returns {Object|null} Objeto Wine o null si no existe
 */
export function findByIdAndUser(id, userId) {
  const db = getDatabase();
  const query = `
    SELECT * FROM wines 
    WHERE id = ? AND user_id = ?
  `;

  const row = db.prepare(query).get(id, userId);
  return mapRowToWine(row);
}

/**
 * Crea un nuevo vino
 * @param {string} userId - ID del usuario propietario
 * @param {Object} wineData - Datos del vino a crear
 * @returns {Object} Vino creado con todos sus campos
 */
export function createWine(userId, wineData) {
  const db = getDatabase();
  const now = new Date().toISOString();

  const wine = {
    id: crypto.randomUUID(),
    userId: userId,
    name: wineData.name,
    winery: wineData.winery || null,
    grape: wineData.grape,
    year: wineData.year || null,
    country: wineData.country || null,
    region: wineData.region || null,
    place: wineData.place || null,
    rating: wineData.rating || null,
    aromas: wineData.aromas || null,
    flavors: wineData.flavors || null,
    notes: wineData.notes || null,
    imageUrl: wineData.imageUrl || null,
    aiNotes: wineData.aiNotes || null,
    createdAt: now,
    updatedAt: now
  };

  const columns = mapWineToColumns(wine);

  const query = `
    INSERT INTO wines (
      id, user_id, name, winery, grape, year, country, region, place,
      rating, aromas, flavors, notes, image_url, ai_notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.prepare(query).run(
    columns.id,
    columns.user_id,
    columns.name,
    columns.winery,
    columns.grape,
    columns.year,
    columns.country,
    columns.region,
    columns.place,
    columns.rating,
    columns.aromas,
    columns.flavors,
    columns.notes,
    columns.image_url,
    columns.ai_notes,
    columns.created_at,
    columns.updated_at
  );

  return wine;
}

/**
 * Actualiza un vino existente
 * @param {string} id - ID del vino
 * @param {string} userId - ID del usuario propietario
 * @param {Object} partialData - Datos parciales a actualizar
 * @returns {Object|null} Vino actualizado o null si no existe
 */
export function updateWine(id, userId, partialData) {
  const db = getDatabase();

  // Buscar el vino actual
  const existingWine = findByIdAndUser(id, userId);

  if (!existingWine) {
    return null;
  }

  // Merge de datos actuales con los nuevos
  const updatedWine = {
    ...existingWine,
    ...partialData,
    id: existingWine.id, // No permitir cambiar el ID
    userId: existingWine.userId, // No permitir cambiar el userId
    createdAt: existingWine.createdAt, // No permitir cambiar la fecha de creación
    updatedAt: new Date().toISOString() // Actualizar timestamp
  };

  const columns = mapWineToColumns(updatedWine);

  const query = `
    UPDATE wines 
    SET name = ?, winery = ?, grape = ?, year = ?, country = ?, region = ?,
        place = ?, rating = ?, aromas = ?, flavors = ?, notes = ?,
        image_url = ?, ai_notes = ?, updated_at = ?
    WHERE id = ? AND user_id = ?
  `;

  db.prepare(query).run(
    columns.name,
    columns.winery,
    columns.grape,
    columns.year,
    columns.country,
    columns.region,
    columns.place,
    columns.rating,
    columns.aromas,
    columns.flavors,
    columns.notes,
    columns.image_url,
    columns.ai_notes,
    columns.updated_at,
    columns.id,
    columns.user_id
  );

  return updatedWine;
}

/**
 * Elimina un vino
 * @param {string} id - ID del vino
 * @param {string} userId - ID del usuario propietario
 * @returns {boolean} true si se eliminó, false si no existía
 */
export function deleteWine(id, userId) {
  const db = getDatabase();

  const query = `
    DELETE FROM wines 
    WHERE id = ? AND user_id = ?
  `;

  const result = db.prepare(query).run(id, userId);

  return result.changes === 1;
}

