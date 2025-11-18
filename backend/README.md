# SommelIAr Backend - CRUD Completo

## Estado Actual

**CRUD de Wines completamente implementado con SQLite**

- Base de datos SQLite con `better-sqlite3`
- Modelo completo (5 operaciones CRUD)
- Controladores con manejo de errores
- Validación de datos
- Rutas REST completas
- Middleware de errores global
- Logger de requests

---

## Cómo Probar

### 1. Instalar dependencias e iniciar servidor

```bash
cd backend
npm install

# Configurar JWT_SECRET
cp .env.example .env
# Edita .env y cambia JWT_SECRET por un secreto seguro

npm run dev
```

El servidor arrancará en `http://localhost:4000`

### 2. Probar autenticación

```bash
# Hacer ejecutable (solo la primera vez)
chmod +x test-auth.sh

# Ejecutar pruebas de autenticación
./test-auth.sh
```

### 2. Probar con el script automatizado

```bash
# Hacer ejecutable (solo la primera vez)
chmod +x test-api.sh

# Ejecutar todas las pruebas
./test-api.sh
```

Este script probará:
- Health check
- Listar vinos (vacío inicial)
- Crear vinos (2)
- Obtener vino por ID
- Actualizar vino
- Eliminar vino
- Validaciones (errores 400 y 404)

### 3. Probar manualmente con cURL

#### Crear un vino
```bash
curl -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Catena Zapata Malbec",
    "grape": "Malbec",
    "year": 2020,
    "rating": 4.5,
    "country": "Argentina"
  }'
```

#### Listar todos los vinos
```bash
curl http://localhost:4000/api/wines
```

#### Ver más ejemplos
Consulta `API_TESTS.md` para documentación completa.

---

## Estructura del Proyecto

```
backend/
├── src/
│   ├── index.js                 # Servidor Express principal
│   ├── database/
│   │   ├── db.js                # Configuración SQLite
│   │   └── sommelier.db         # Base de datos (auto-creada)
│   ├── models/
│   │   └── wineModel.js         # Modelo de datos (CRUD)
│   ├── controllers/
│   │   └── wineController.js    # Lógica de negocio
│   ├── routes/
│   │   ├── index.js             # Router principal
│   │   └── wineRoutes.js        # Rutas de vinos
│   └── middlewares/
│       ├── requestLogger.js     # Logger de requests
│       ├── validateWine.js      # Validación de datos
│       └── errorHandler.js      # Manejo de errores
├── package.json
├── .env.example                 # Template de variables
├── API_TESTS.md                 # Documentación API
├── BACKEND_STATUS.md            # Estado detallado
└── test-api.sh                  # Script de pruebas
```

---

## Endpoints Disponibles

### Autenticación (Públicos)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registra nuevo usuario |
| POST | `/api/auth/login` | Login (obtiene JWT) |

### Vinos (Requieren JWT)
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/health` | Health check | No |
| GET | `/api/wines` | Lista todos los vinos | JWT |
| GET | `/api/wines/:id` | Obtiene un vino | JWT |
| POST | `/api/wines` | Crea un vino | JWT |
| PUT | `/api/wines/:id` | Actualiza un vino | JWT |
| DELETE | `/api/wines/:id` | Elimina un vino | JWT |

---

## Autenticación JWT

Sistema completo implementado

- Registro de usuarios con bcrypt (hash seguro)
- Login con JWT (expiración 1 hora)
- Todas las rutas de wines protegidas
- Cada usuario ve solo sus propios vinos

Flujo:
1. POST /api/auth/register → Crear cuenta
2. POST /api/auth/login → Obtener token
3. Usar token en header: `Authorization: Bearer <token>`

Ver guía completa en `AUTH_GUIDE.md`

---

## Troubleshooting

### El servidor no arranca
```bash
# Verificar que el puerto 4000 esté libre
lsof -i :4000

# Cambiar el puerto en .env si es necesario
echo "PORT=4001" > .env
```

### Error de SQLite
```bash
# Eliminar la base de datos y dejar que se recree
rm src/database/sommelier.db
npm run dev
```

### Dependencias faltantes
```bash
npm install
```

---

## Logs

El servidor muestra:
- Timestamp de inicio
- Puerto en uso
- Cada request (método + ruta + timestamp)
- Errores detallados en consola

Ejemplo:
```
[2024-01-15T10:30:00.000Z] SommelIAr backend listening on port 4000
[2024-01-15T10:30:05.123Z] POST /api/wines
[2024-01-15T10:30:06.456Z] GET /api/wines
```

---

## Características Técnicas

- **Base de datos**: SQLite con `better-sqlite3` (síncrono, rápido)
- **IDs**: UUIDs v4 con `crypto.randomUUID()`
- **Timestamps**: ISO 8601 strings
- **Validación**: Custom middleware (sin librerías externas)
- **Error handling**: Middleware centralizado
- **Code style**: ES Modules, async/await, nombres descriptivos
- **Mapeo**: Automático snake_case ↔ camelCase

---

## Próximos Pasos Sugeridos

1. Implementar autenticación JWT
2. Rutas de registro/login (`/api/auth`)
3. Integración con IA (OpenAI/Gemini) para notas
4. Upload de imágenes
5. Tests unitarios/integración
6. Paginación en listados
7. Búsqueda y filtros

---

## Soporte

- Ver documentación completa en `API_TESTS.md`
- Estado detallado en `BACKEND_STATUS.md`
- Ejecutar pruebas con `./test-api.sh`

---

**Estado**: **CRUD COMPLETO Y FUNCIONAL**

**Última actualización**: $(date)
