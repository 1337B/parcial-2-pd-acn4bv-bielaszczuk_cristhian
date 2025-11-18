import { getDatabase } from '../database/db.js';

/**
 * Busca un usuario por email
 * @param {string} email - Email del usuario
 * @returns {Object|null} Usuario encontrado o null
 */
export function findByEmail(email) {
  const db = getDatabase();
  const query = `SELECT * FROM users WHERE email = ?`;
  const user = db.prepare(query).get(email);
  return user || null;
}

/**
 * Busca un usuario por ID
 * @param {string} id - ID del usuario
 * @returns {Object|null} Usuario encontrado o null
 */
export function findById(id) {
  const db = getDatabase();
  const query = `SELECT * FROM users WHERE id = ?`;
  const user = db.prepare(query).get(id);
  return user || null;
}

/**
 * Crea un nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} passwordHash - Password hasheado con bcrypt
 * @returns {Object} Usuario creado
 */
export function createUser(email, passwordHash) {
  const db = getDatabase();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO users (id, email, password_hash, created_at)
    VALUES (?, ?, ?, ?)
  `;

  db.prepare(query).run(id, email, passwordHash, createdAt);

  return {
    id,
    email,
    createdAt
  };
}

