/**
 * Middleware de validación para crear/actualizar vinos
 * Valida que los campos obligatorios estén presentes y sean del tipo correcto
 */
export function validateWine(req, res, next) {
  const { name, grape, year, rating } = req.body;

  // Validar campos obligatorios
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      error: 'El campo "name" es obligatorio y debe ser un texto no vacío'
    });
  }

  if (!grape || typeof grape !== 'string' || grape.trim().length === 0) {
    return res.status(400).json({
      error: 'El campo "grape" es obligatorio y debe ser un texto no vacío'
    });
  }

  // Validar year
  if (year === undefined || year === null) {
    return res.status(400).json({
      error: 'El campo "year" es obligatorio'
    });
  }

  const yearNum = Number(year);
  if (!Number.isInteger(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
    return res.status(400).json({
      error: 'El campo "year" debe ser un año válido (número entero >= 1900)'
    });
  }

  // Validar rating
  if (rating === undefined || rating === null) {
    return res.status(400).json({
      error: 'El campo "rating" es obligatorio'
    });
  }

  const ratingNum = Number(rating);
  if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
    return res.status(400).json({
      error: 'El campo "rating" debe ser un número entre 0 y 5'
    });
  }

  // Si todo es válido, continuar
  next();
}

/**
 * Middleware de validación para actualizar vinos
 * Solo valida los campos que están presentes (actualización parcial)
 */
export function validateWineUpdate(req, res, next) {
  const { name, grape, year, rating } = req.body;

  // Validar name solo si está presente
  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    return res.status(400).json({
      error: 'El campo "name" debe ser un texto no vacío'
    });
  }

  // Validar grape solo si está presente
  if (grape !== undefined && (typeof grape !== 'string' || grape.trim().length === 0)) {
    return res.status(400).json({
      error: 'El campo "grape" debe ser un texto no vacío'
    });
  }

  // Validar year solo si está presente
  if (year !== undefined && year !== null) {
    const yearNum = Number(year);
    if (!Number.isInteger(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 1) {
      return res.status(400).json({
        error: 'El campo "year" debe ser un año válido (número entero >= 1900)'
      });
    }
  }

  // Validar rating solo si está presente
  if (rating !== undefined && rating !== null) {
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      return res.status(400).json({
        error: 'El campo "rating" debe ser un número entre 0 y 5'
      });
    }
  }

  // Si todo es válido, continuar
  next();
}

