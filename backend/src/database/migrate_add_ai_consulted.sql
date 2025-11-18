PRAGMA table_info(wines);

SELECT CASE
  WHEN EXISTS (
    SELECT 1 FROM pragma_table_info('wines') WHERE name='ai_consulted'
  )
  THEN 'Columna ai_consulted ya existe'
  ELSE 'Necesita migración'
END as status;

ALTER TABLE wines ADD COLUMN ai_consulted INTEGER DEFAULT 0;

SELECT 'Migración completada' as result;

