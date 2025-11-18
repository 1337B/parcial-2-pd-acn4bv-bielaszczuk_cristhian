-- Migración para agregar columna ai_consulted a la tabla wines
-- Ejecutar con: cd backend/src/database && sqlite3 sommelier.db < migrate_add_ai_consulted.sql

-- Verificar si la columna ya existe
PRAGMA table_info(wines);

-- Agregar columna ai_consulted si no existe
-- SQLite no soporta ALTER TABLE ADD COLUMN IF NOT EXISTS
-- Por lo tanto, intentamos agregarla y si falla, ignoramos el error

-- Primero verificamos si necesitamos migrar
SELECT CASE
  WHEN EXISTS (
    SELECT 1 FROM pragma_table_info('wines') WHERE name='ai_consulted'
  )
  THEN 'Columna ai_consulted ya existe'
  ELSE 'Necesita migración'
END as status;

-- Agregar la columna (esto fallará si ya existe, pero es seguro)
ALTER TABLE wines ADD COLUMN ai_consulted INTEGER DEFAULT 0;

-- Verificar resultado
SELECT 'Migración completada' as result;

