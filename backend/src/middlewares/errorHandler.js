export function errorHandler(err, req, res, next) {
  // Loguear el error para debugging
  console.error('[ERROR]', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    error: err.message,
    stack: err.stack
  });

  // Si ya se envió una respuesta, delegar al error handler por defecto
  if (res.headersSent) {
    return next(err);
  }

  // Determinar el código de estado
  const statusCode = err.statusCode || err.status || 500;

  // Mensaje de error
  const message = statusCode === 500
    ? 'Internal server error'
    : err.message || 'Error processing request';

  // Enviar respuesta de error
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

