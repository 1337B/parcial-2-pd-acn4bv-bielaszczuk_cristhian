import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

let dbInstance;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'sommelier.db');

export function getDatabase() {
  if (!dbInstance) {
    dbInstance = new Database(dbPath);
  }
  return dbInstance;
}

export function initializeDatabase() {
  const db = getDatabase();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS wines (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      winery TEXT,
      grape TEXT NOT NULL,
      year INTEGER,
      country TEXT,
      region TEXT,
      place TEXT,
      rating REAL,
      aromas TEXT,
      flavors TEXT,
      notes TEXT,
      image_url TEXT,
      ai_notes TEXT,
      ai_consulted INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  try {
    const columns = db.prepare("PRAGMA table_info(wines)").all();
    const hasAiConsulted = columns.some(col => col.name === 'ai_consulted');

    if (!hasAiConsulted) {
      console.log('Migrando base de datos: agregando columna ai_consulted...');
      db.exec(`ALTER TABLE wines ADD COLUMN ai_consulted INTEGER DEFAULT 0;`);
      console.log('Migración completada exitosamente');
    }
  } catch (error) {
    console.log('Nota: columna ai_consulted ya existe o no se pudo agregar');
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS wine_ai_consultations (
      id TEXT PRIMARY KEY,
      wine_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      prompt_sent TEXT NOT NULL,
      ai_response TEXT NOT NULL,
      model_used TEXT NOT NULL,
      tokens_used INTEGER,
      consulted_at TEXT NOT NULL,
      FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_wine_ai_consultations_wine_id 
    ON wine_ai_consultations(wine_id);
  `);
}

