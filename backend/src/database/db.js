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
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}

