const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Internal helper to perform a fetch request with proper headers and error handling.
 * @param {string} path - API path starting with '/'
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @param {string} token - JWT auth token
 * @returns {Promise<any>} Parsed JSON response (if it contains a 'data' property returns that value)
 */
async function apiRequest(path, options = {}, token) {
  if (!token) {
    throw new Error('Token de autenticacion no proporcionado');
  }

  const url = `${API_BASE_URL}${path}`;

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkErr) {
    throw new Error(`Error de red al llamar ${path}: ${networkErr.message}`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch (parseErr) {
    if (!response.ok) {
      throw new Error(`Error ${response.status} sin cuerpo JSON en ${path}`);
    }
    return undefined;
  }

  if (!response.ok) {
    const backendMessage = payload && (payload.error || payload.message);
    throw new Error(backendMessage || `Error ${response.status} en ${path}`);
  }

  return Object.prototype.hasOwnProperty.call(payload, 'data') ? payload.data : payload;
}

// ---- Public API functions ----

/**
 * Obtiene todos los vinos del usuario autenticado
 * @param {string} token JWT
 */
export async function fetchWines(token) {
  return apiRequest('/wines', { method: 'GET' }, token);
}

/**
 * Obtiene un vino por ID
 * @param {string} token JWT
 * @param {string} id ID del vino
 */
export async function getWineById(token, id) {
  if (!id) throw new Error('ID de vino requerido');
  return apiRequest(`/wines/${encodeURIComponent(id)}`, { method: 'GET' }, token);
}

/**
 * Crea un nuevo vino
 * @param {string} token JWT
 * @param {object} wineData Datos del vino
 */
export async function createWine(token, wineData) {
  if (!wineData || typeof wineData !== 'object') {
    throw new Error('wineData invalido');
  }
  return apiRequest('/wines', {
    method: 'POST',
    body: JSON.stringify(wineData),
  }, token);
}

/**
 * Actualiza parcialmente un vino existente
 * @param {string} token JWT
 * @param {string} id ID del vino
 * @param {object} wineData Campos a actualizar
 */
export async function updateWine(token, id, wineData) {
  if (!id) throw new Error('ID de vino requerido');
  if (!wineData || typeof wineData !== 'object') {
    throw new Error('wineData invalido');
  }
  return apiRequest(`/wines/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(wineData),
  }, token);
}

/**
 * Elimina un vino
 * @param {string} token JWT
 * @param {string} id ID del vino
 */
export async function deleteWine(token, id) {
  if (!id) throw new Error('ID de vino requerido');
  return apiRequest(`/wines/${encodeURIComponent(id)}`, { method: 'DELETE' }, token);
}

/**
 * Consulta SommelIApp para generar notas de sommelier
 * @param {string} token JWT
 * @param {string} id ID del vino
 */
export async function consultSommelier(token, id) {
  if (!id) throw new Error('ID de vino requerido');
  return apiRequest(`/wines/${encodeURIComponent(id)}/sommelier`, {
    method: 'POST',
  }, token);
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

