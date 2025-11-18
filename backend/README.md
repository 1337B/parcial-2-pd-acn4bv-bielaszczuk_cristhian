# 🍷 SommelIAr Backend - CRUD Completo

## ✅ Estado Actual

**CRUD de Wines completamente implementado con SQLite**

- ✅ Base de datos SQLite con `better-sqlite3`
- ✅ Modelo completo (5 operaciones CRUD)
- ✅ Controladores con manejo de errores
- ✅ Validación de datos
- ✅ Rutas REST completas
- ✅ Middleware de errores global
- ✅ Logger de requests

---

## 🚀 Cómo Probar

### 1. Instalar dependencias e iniciar servidor

```bash
cd backend
npm install
npm run dev
```

El servidor arrancará en `http://localhost:4000`

### 2. Probar con el script automatizado

```bash
# Hacer ejecutable (solo la primera vez)
chmod +x test-api.sh

# Ejecutar todas las pruebas
./test-api.sh
```

Este script probará:
- ✅ Health check
- ✅ Listar vinos (vacío inicial)
- ✅ Crear vinos (2)
- ✅ Obtener vino por ID
- ✅ Actualizar vino
- ✅ Eliminar vino
- ✅ Validaciones (errores 400 y 404)

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

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── index.js                 # ⚙️  Servidor Express principal
│   ├── database/
│   │   ├── db.js                # 🗄️  Configuración SQLite
│   │   └── sommelier.db         # 📊 Base de datos (auto-creada)
│   ├── models/
│   │   └── wineModel.js         # 📦 Modelo de datos (CRUD)
│   ├── controllers/
│   │   └── wineController.js    # 🎮 Lógica de negocio
│   ├── routes/
│   │   ├── index.js             # 🛣️  Router principal
│   │   └── wineRoutes.js        # 🍷 Rutas de vinos
│   └── middlewares/
│       ├── requestLogger.js     # 📝 Logger de requests
│       ├── validateWine.js      # ✔️  Validación de datos
│       └── errorHandler.js      # ⚠️  Manejo de errores
├── package.json
├── .env.example                 # 📋 Template de variables
├── API_TESTS.md                 # 📚 Documentación API
├── BACKEND_STATUS.md            # 📊 Estado detallado
└── test-api.sh                  # 🧪 Script de pruebas
```

---

## 🔗 Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/wines` | Lista todos los vinos |
| GET | `/api/wines/:id` | Obtiene un vino |
| POST | `/api/wines` | Crea un vino |
| PUT | `/api/wines/:id` | Actualiza un vino |
| DELETE | `/api/wines/:id` | Elimina un vino |

---

## 📊 Esquema de Base de Datos

### Tabla: wines

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | TEXT (PK) | UUID generado automáticamente |
| user_id | TEXT | ID del usuario (ahora "demo-user") |
| name | TEXT | Nombre del vino ⭐ |
| winery | TEXT | Bodega |
| grape | TEXT | Varietal ⭐ |
| year | INTEGER | Año de cosecha ⭐ |
| country | TEXT | País |
| region | TEXT | Región |
| place | TEXT | Lugar de compra |
| rating | REAL | Calificación 0-5 ⭐ |
| aromas | TEXT | Aromas percibidos |
| flavors | TEXT | Sabores |
| notes | TEXT | Notas personales |
| image_url | TEXT | URL de imagen |
| ai_notes | TEXT | Notas del sommelier IA |
| created_at | TEXT | Timestamp de creación |
| updated_at | TEXT | Timestamp de actualización |

⭐ = Campos obligatorios

---

## 🧪 Validaciones

### POST (crear vino)
- ✅ `name`: string no vacío (obligatorio)
- ✅ `grape`: string no vacío (obligatorio)
- ✅ `year`: integer >= 1900 (obligatorio)
- ✅ `rating`: number 0-5 (obligatorio)

### PUT (actualizar vino)
- ✅ Actualización parcial (todos los campos opcionales)
- ✅ Si se envían, deben cumplir las mismas reglas

---

## 🔐 Nota sobre Autenticación

Actualmente todos los endpoints usan un `userId` fijo: `"demo-user"`.

**Próximo paso**: Implementar JWT y reemplazar por usuario real del token.

---

## 🐛 Troubleshooting

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

## 📝 Logs

El servidor muestra:
- ✅ Timestamp de inicio
- ✅ Puerto en uso
- ✅ Cada request (método + ruta + timestamp)
- ✅ Errores detallados en consola

Ejemplo:
```
[2024-01-15T10:30:00.000Z] SommelIAr backend listening on port 4000
[2024-01-15T10:30:05.123Z] POST /api/wines
[2024-01-15T10:30:06.456Z] GET /api/wines
```

---

## ✨ Características Técnicas

- **Base de datos**: SQLite con `better-sqlite3` (síncrono, rápido)
- **IDs**: UUIDs v4 con `crypto.randomUUID()`
- **Timestamps**: ISO 8601 strings
- **Validación**: Custom middleware (sin librerías externas)
- **Error handling**: Middleware centralizado
- **Code style**: ES Modules, async/await, nombres descriptivos
- **Mapeo**: Automático snake_case ↔ camelCase

---

## 🎯 Próximos Pasos Sugeridos

1. ⏳ Implementar autenticación JWT
2. ⏳ Rutas de registro/login (`/api/auth`)
3. ⏳ Integración con IA (OpenAI/Gemini) para notas
4. ⏳ Upload de imágenes
5. ⏳ Tests unitarios/integración
6. ⏳ Paginación en listados
7. ⏳ Búsqueda y filtros

---

## 📞 Soporte

- Ver documentación completa en `API_TESTS.md`
- Estado detallado en `BACKEND_STATUS.md`
- Ejecutar pruebas con `./test-api.sh`

---

**Estado**: ✅ **CRUD COMPLETO Y FUNCIONAL**

**Última actualización**: $(date)

