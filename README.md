# SommelIApp - Plataforma de Gestión de Vinos con Sommelier IA

> Documentación académica completa: [INFORME.md](./INFORME.md)
> 
> Demo en producción: [https://sommeliapp.vercel.app/login](https://sommeliapp.vercel.app/login) (frontend en Vercel, backend en Render)

## Descripción

SommelIApp es una aplicación web full-stack que permite a los usuarios gestionar su colección personal de vinos y obtener análisis profesionales generados por inteligencia artificial. La plataforma combina un sistema completo de gestión de vinos (CRUD) con la capacidad de consultar a un sommelier virtual basado en OpenAI para obtener análisis detallados de aromas, sabores, maridajes y recomendaciones.

## Características Principales

### Gestión de Vinos
- **Registro y autenticación de usuarios**: Sistema completo con JWT para seguridad
- **CRUD completo de vinos**: Crear, leer, actualizar y eliminar vinos de tu colección
- **Información detallada**: Nombre, bodega, cepa, añada, país, región, lugar de compra
- **Sistema de calificación**: Valoración de 0 a 5 estrellas
- **Notas personales**: Aromas, sabores y observaciones propias
- **Imágenes de vinos**: Soporte para URLs de imágenes

### Sommelier IA
- **Análisis inteligente**: Consulta a OpenAI para obtener análisis profesionales
- **Información generada**: Perfil aromático, perfil gustativo, maridajes sugeridos, temperatura ideal, potencial de guarda
- **Caché de consultas**: Las consultas IA se almacenan para evitar regeneraciones innecesarias
- **Indicador visual**: Marcador que muestra si un vino ya fue analizado por la IA

### Interfaz de Usuario
- **Diseño responsive**: Adaptado para desktop, tablet y móvil
- **Paleta temática**: Colores inspirados en el vino (tonos bordo y crema)
- **Menú hamburguesa**: Navegación optimizada para móviles
- **Animaciones**: Loader personalizado con racimo de uvas durante consultas IA
- **Notificaciones**: Sistema de toasts para feedback inmediato al usuario

## Arquitectura Técnica

### Stack Tecnológico

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Base de datos**: SQLite con better-sqlite3
- **Autenticación**: JSON Web Tokens (JWT)
- **Encriptación**: bcrypt para passwords
- **IA**: OpenAI API (GPT-4)
- **CORS**: Configurado para desarrollo y producción

#### Frontend
- **Framework**: React 18
- **Build tool**: Vite 5
- **Routing**: React Router DOM v6
- **Estilos**: Tailwind CSS 3
- **Componentes UI**: Flowbite React
- **Iconos**: React Icons
- **Notificaciones**: React Hot Toast
- **HTTP Client**: Fetch API nativo

### Arquitectura de la Aplicación

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  React + Vite + Tailwind CSS + React Router                 │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │   Services   │     │
│  │              │  │              │  │              │     │
│  │ - Login      │  │ - WineCard   │  │ - apiClient  │     │
│  │ - Register   │  │ - WineForm   │  │ - Auth       │     │
│  │ - WineList   │  │ - BurgerMenu │  │              │     │
│  │ - WineDetail │  │ - Footer     │  │              │     │
│  │ - WineForm   │  │ - Loader     │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/JSON (REST API)
                              │ JWT Authentication
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│  Node.js + Express + SQLite                                 │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Routes     │  │ Controllers  │  │    Models    │     │
│  │              │  │              │  │              │     │
│  │ - auth       │  │ - auth       │  │ - user       │     │
│  │ - wines      │  │ - wine       │  │ - wine       │     │
│  │              │  │              │  │ - aiConsult  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                            ▼                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Middlewares  │  │   Services   │  │   Database   │     │
│  │              │  │              │  │              │     │
│  │ - auth       │  │ - OpenAI     │  │ - SQLite     │     │
│  │ - validator  │  │              │  │ - Tables:    │     │
│  │ - logger     │  │              │  │   * users    │     │
│  │ - errors     │  │              │  │   * wines    │     │
│  │              │  │              │  │   * ai_cons  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API REST
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     OPENAI API (GPT-4)                      │
│  Análisis de vinos y recomendaciones de sommelier          │
└─────────────────────────────────────────────────────────────┘
```

### Estructura de Directorios

```
p2-pd/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Entry point del servidor
│   │   ├── controllers/             # Lógica de negocio
│   │   │   ├── authController.js    # Login, register
│   │   │   └── wineController.js    # CRUD de vinos + IA
│   │   ├── database/                # Base de datos SQLite
│   │   │   ├── db.js                # Configuración y setup
│   │   │   └── sommelier.db         # Base de datos (SQLite)
│   │   ├── middlewares/             # Middlewares Express
│   │   │   ├── authMiddleware.js    # Verificación JWT
│   │   │   ├── errorHandler.js      # Manejo de errores
│   │   │   ├── requestLogger.js     # Logs de requests
│   │   │   └── validateWine.js      # Validación de datos
│   │   ├── models/                  # Modelos de datos
│   │   │   ├── userModel.js         # Usuarios
│   │   │   ├── wineModel.js         # Vinos
│   │   │   └── aiConsultationModel.js # Consultas IA
│   │   ├── routes/                  # Definición de rutas
│   │   │   ├── index.js             # Router principal
│   │   │   ├── authRoutes.js        # Rutas de auth
│   │   │   └── wineRoutes.js        # Rutas de vinos
│   │   └── services/                # Servicios externos
│   │       └── aiService.js         # Integración OpenAI
│   ├── package.json
│   ├── .env                         # Variables de entorno
│   └── .env.example                 # Template de variables
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # Entry point React
│   │   ├── App.jsx                  # Componente principal + routing
│   │   ├── index.css                # Estilos globales + Tailwind
│   │   ├── assets/                  # Assets estáticos
│   │   │   ├── grapes.svg           # Loader IA
│   │   │   ├── nose.svg             # Icono aromas
│   │   │   └── wineglass.svg        # Icono vino
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── BurgerMenu.jsx       # Menú hamburguesa
│   │   │   ├── Footer.jsx           # Footer de la app
│   │   │   ├── GrapeLoader.jsx      # Loader animado
│   │   │   ├── LoadingModal.jsx     # Modal de carga IA
│   │   │   ├── PrivateRoute.jsx     # Protección de rutas
│   │   │   ├── WineCard.jsx         # Card de vino en lista
│   │   │   └── WineForm.jsx         # Formulario de vino
│   │   ├── context/                 # Context API
│   │   │   └── AuthContext.jsx      # Estado de autenticación
│   │   ├── pages/                   # Páginas principales
│   │   │   ├── LoginPage.jsx        # Login
│   │   │   ├── RegisterPage.jsx     # Registro
│   │   │   ├── WineListPage.jsx     # Lista de vinos
│   │   │   ├── WineDetailPage.jsx   # Detalle + consulta IA
│   │   │   └── WineFormPage.jsx     # Crear/editar vino
│   │   └── services/                # Servicios HTTP
│   │       └── apiClient.js         # Cliente API centralizado
│   ├── public/
│   │   └── vite.svg                 # Favicon
│   ├── package.json
│   ├── vite.config.js               # Configuración Vite
│   ├── tailwind.config.js           # Configuración Tailwind
│   ├── postcss.config.js            # PostCSS
│   ├── vercel.json                  # Config para Vercel
│   ├── .env.local                   # Variables de entorno local
│   └── .env.example                 # Template de variables
│
├── .gitignore
└── README.md
```

## Base de Datos

### Modelo de Datos

#### Tabla: users
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,              -- UUID
  email TEXT UNIQUE NOT NULL,       -- Email del usuario
  password_hash TEXT NOT NULL,      -- Hash bcrypt del password
  created_at TEXT NOT NULL          -- ISO timestamp
);
```

#### Tabla: wines
```sql
CREATE TABLE wines (
  id TEXT PRIMARY KEY,              -- UUID
  user_id TEXT NOT NULL,            -- FK a users
  name TEXT NOT NULL,               -- Nombre del vino
  winery TEXT,                      -- Bodega
  grape TEXT NOT NULL,              -- Cepa/varietal
  year INTEGER,                     -- Añada
  country TEXT,                     -- País
  region TEXT,                      -- Región
  place TEXT,                       -- Lugar de compra
  rating REAL,                      -- Calificación 0-5
  aromas TEXT,                      -- Notas de aromas
  flavors TEXT,                     -- Notas de sabores
  notes TEXT,                       -- Notas generales
  image_url TEXT,                   -- URL de imagen
  ai_notes TEXT,                    -- Análisis de la IA
  ai_consulted INTEGER DEFAULT 0,   -- Flag si fue consultado
  created_at TEXT NOT NULL,         -- ISO timestamp
  updated_at TEXT NOT NULL,         -- ISO timestamp
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### Tabla: wine_ai_consultations
```sql
CREATE TABLE wine_ai_consultations (
  id TEXT PRIMARY KEY,              -- UUID
  wine_id TEXT NOT NULL,            -- FK a wines
  user_id TEXT NOT NULL,            -- FK a users
  prompt_sent TEXT NOT NULL,        -- Prompt enviado a OpenAI
  ai_response TEXT NOT NULL,        -- Respuesta de OpenAI
  model_used TEXT NOT NULL,         -- Modelo usado (gpt-4, etc)
  tokens_used INTEGER,              -- Tokens consumidos
  consulted_at TEXT NOT NULL,       -- ISO timestamp
  FOREIGN KEY (wine_id) REFERENCES wines(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## API REST

### Endpoints de Autenticación

#### POST /api/auth/register
Registra un nuevo usuario.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "User registered successfully"
}
```

#### POST /api/auth/login
Inicia sesión y devuelve token JWT.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "usuario@ejemplo.com"
  }
}
```

### Endpoints de Vinos

Todos los endpoints requieren header de autenticación:
```
Authorization: Bearer <token>
```

#### GET /api/wines
Obtiene todos los vinos del usuario autenticado.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Malbec Reserva",
      "winery": "Bodega Norton",
      "grape": "Malbec",
      "year": 2020,
      "country": "Argentina",
      "region": "Mendoza",
      "rating": 4.5,
      "aiConsulted": 1,
      "createdAt": "2024-11-18T10:00:00.000Z"
    }
  ]
}
```

#### GET /api/wines/:id
Obtiene un vino específico por ID.

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Malbec Reserva",
    "winery": "Bodega Norton",
    "grape": "Malbec",
    "year": 2020,
    "country": "Argentina",
    "region": "Mendoza",
    "place": "Vinoteca Central",
    "rating": 4.5,
    "aromas": "Frutas rojas, vainilla, especias",
    "flavors": "Taninos suaves, final largo",
    "notes": "Excelente para carnes rojas",
    "imageUrl": "https://ejemplo.com/vino.jpg",
    "aiNotes": "Análisis completo de la IA...",
    "aiConsulted": 1,
    "createdAt": "2024-11-18T10:00:00.000Z",
    "updatedAt": "2024-11-18T10:00:00.000Z"
  }
}
```

#### POST /api/wines
Crea un nuevo vino.

**Request Body:**
```json
{
  "name": "Malbec Reserva",
  "winery": "Bodega Norton",
  "grape": "Malbec",
  "year": 2020,
  "country": "Argentina",
  "region": "Mendoza",
  "place": "Vinoteca Central",
  "rating": 4.5,
  "aromas": "Frutas rojas, vainilla",
  "flavors": "Taninos suaves",
  "notes": "Excelente",
  "imageUrl": "https://ejemplo.com/vino.jpg"
}
```

**Response (201):**
```json
{
  "data": {
    "id": "uuid-generado",
    "name": "Malbec Reserva",
    ...
  }
}
```

#### PUT /api/wines/:id
Actualiza un vino existente.

**Request Body:** (campos opcionales)
```json
{
  "rating": 5.0,
  "notes": "Notas actualizadas"
}
```

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "name": "Malbec Reserva",
    ...
  }
}
```

#### DELETE /api/wines/:id
Elimina un vino.

**Response (200):**
```json
{
  "message": "Wine deleted successfully"
}
```

#### POST /api/wines/:id/sommelier
Consulta al sommelier IA para análisis del vino.

**Response (200):**
```json
{
  "data": {
    "aiNotes": "## Perfil Aromático\n\nEste Malbec presenta...",
    "consultation": {
      "id": "uuid",
      "modelUsed": "gpt-4",
      "tokensUsed": 1250,
      "consultedAt": "2024-11-18T10:30:00.000Z"
    }
  }
}
```

### Health Check

#### GET /api/health
Verifica que la API está funcionando.

**Response (200):**
```json
{
  "status": "ok"
}
```

## Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Cuenta de OpenAI con API key

### Instalación

#### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd p2-pd
```

#### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
PORT=4000
JWT_SECRET=tu-secret-key-muy-segura
OPENAI_API_KEY=sk-tu-api-key-de-openai
```

#### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env.local`:

```bash
cp .env.example .env.local
```

Editar `.env.local`:

```env
VITE_API_URL=http://localhost:4000/api
```

### Ejecución en Desarrollo

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

El backend se ejecutará en: `http://localhost:4000`

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

El frontend se ejecutará en: `http://localhost:5173`

### Ejecución en Producción

#### Build del Frontend

```bash
cd frontend
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

#### Iniciar Backend en Producción

```bash
cd backend
npm start
```

## Deployment

### Backend (Render)

1. Crear nuevo Web Service en Render
2. Conectar repositorio
3. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
4. Agregar variables de entorno:
   - `PORT` (Render lo configura automáticamente)
   - `JWT_SECRET`
   - `OPENAI_API_KEY`

### Frontend (Vercel)

1. Importar proyecto en Vercel
2. Configurar:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Agregar variable de entorno:
   - `VITE_API_URL`: URL de tu backend en Render

### Accesos rápidos
- Frontend (Vercel): https://sommeliapp.vercel.app/login
- Backend (Render API base): https://<tu-backend>.onrender.com/api

## Variables de Entorno

### Backend (.env)

```env
# Puerto del servidor (Render lo configura automáticamente en producción)
PORT=4000

# Secret para firmar tokens JWT (generar uno seguro)
JWT_SECRET=tu-secret-key

# API Key de OpenAI
OPENAI_API_KEY=sk-api-key-de-openai
```

### Frontend (.env.local)

```env
# URL base de la API backend
# Desarrollo: http://localhost:4000/api
# Producción: https://tu-backend.onrender.com/api
VITE_API_URL=http://localhost:4000/api
```

## Testing

### Verificar Backend

```bash
# Health check
curl http://localhost:4000/api/health

# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get wines (con token)
curl http://localhost:4000/api/wines \
  -H "Authorization: Bearer <tu-token>"
```

### Verificar Frontend

1. Abrir `http://localhost:5173`
2. Registrar un usuario
3. Crear un vino
4. Consultar sommelier IA
5. Verificar que todas las operaciones CRUD funcionen

## Scripts Disponibles

### Backend

```bash
npm start        # Ejecutar en producción
npm run dev      # Ejecutar con nodemon (desarrollo)
```

### Frontend

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build para producción
npm run preview  # Preview del build local
```

## Tecnologías y Librerías

### Backend

| Librería | Versión | Propósito |
|----------|---------|-----------|
| express | ^4.19.2 | Framework web |
| better-sqlite3 | ^11.5.0 | Base de datos SQLite |
| bcrypt | ^5.1.1 | Hash de passwords |
| jsonwebtoken | ^9.0.2 | Autenticación JWT |
| openai | ^4.67.0 | Integración con OpenAI |
| cors | ^2.8.5 | CORS middleware |
| dotenv | ^16.4.5 | Variables de entorno |
| nodemon | ^3.1.4 | Auto-reload en desarrollo |

### Frontend

| Librería | Versión | Propósito |
|----------|---------|-----------|
| react | ^18.3.1 | Librería UI |
| react-dom | ^18.3.1 | Renderizado React |
| react-router-dom | ^6.26.0 | Routing |
| vite | ^5.3.1 | Build tool |
| tailwindcss | ^3.4.1 | Framework CSS utility-first |
| flowbite-react | ^0.10.1 | Componentes UI |
| react-hot-toast | ^2.4.1 | Notificaciones |
| react-icons | ^5.0.1 | Iconos |

## Características de Seguridad

- **Autenticación JWT**: Tokens firmados con secret seguro
- **Hash de passwords**: bcrypt con salt rounds
- **Validación de datos**: Middleware de validación en backend
- **CORS configurado**: Restricción de orígenes permitidos
- **SQL injection protection**: Uso de prepared statements con better-sqlite3
- **Variables de entorno**: Credenciales sensibles fuera del código
- **Rutas protegidas**: Middleware de autenticación en endpoints privados

## Contribución

Este proyecto fue desarrollado como parte del parcial de "Plataformas de Desarrollo 2".

## Licencia

MIT

## Autor

Cristhian Bielaszczuk

## Fecha

Noviembre 2025
