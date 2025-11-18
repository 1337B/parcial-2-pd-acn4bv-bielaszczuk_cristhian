# Guía de Configuración Rápida - Backend con JWT

## Pasos para poner en marcha el backend con autenticación

### 1 Instalar Dependencias

```bash
cd backend
npm install
```

Esto instalará:
- express
- cors
- dotenv
- better-sqlite3
- bcrypt (nuevo)
- jsonwebtoken (nuevo)
- nodemon (dev)

---

### 2 Configurar Variables de Entorno

```bash
# Copiar el template
cp .env.example .env
```

Edita el archivo `.env` y configura:

```env
PORT=4000
JWT_SECRET=cambiar-por-secreto-seguro-aleatorio
```

IMPORTANTE: Genera un JWT_SECRET seguro:

```bash
# Opción 1: OpenSSL (macOS/Linux)
openssl rand -base64 32

# Opción 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copia el resultado y reemplaza el valor en `.env`:

```env
JWT_SECRET=tu-secreto-generado-aqui
```

---

### 3 Iniciar el Servidor

```bash
npm run dev
```

Deberías ver:
```
[2025-11-17T...] SommelIAr backend listening on port 4000
```

---

### 4 Verificar que Funciona

#### Opción A: Health Check Rápido

```bash
curl http://localhost:4000/api/health
```

Debería responder:
```json
{"status":"ok"}
```

#### Opción B: Ejecutar Tests Automatizados

```bash
# Hacer ejecutable (solo primera vez)
chmod +x test-auth.sh

# Ejecutar pruebas
./test-auth.sh
```

Esto ejecutará 15 pruebas del sistema de autenticación.

---

### 5 Probar Manualmente

#### Registrar Usuario

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "prueba@example.com",
    "password": "password123"
  }'
```

Respuesta esperada:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-generado",
    "email": "prueba@example.com"
  }
}
```

#### Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "prueba@example.com",
    "password": "password123"
  }'
```

Respuesta esperada:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-del-usuario",
    "email": "prueba@example.com"
  }
}
```

Guarda el token para los siguientes pasos.

#### Crear Vino (con autenticación)

```bash
# Reemplaza <TU_TOKEN> con el token del paso anterior
curl -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TU_TOKEN>" \
  -d '{
    "name": "Rutini Malbec",
    "grape": "Malbec",
    "year": 2020,
    "rating": 4.5
  }'
```

#### Listar Vinos

```bash
curl http://localhost:4000/api/wines \
  -H "Authorization: Bearer <TU_TOKEN>"
```

---

## Troubleshooting

### Error: "Cannot find module 'bcrypt'"

Solución:
```bash
npm install
```

Si persiste:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "JWT_SECRET no está configurado"

Problema: No existe el archivo `.env` o JWT_SECRET está vacío.

Solución:
```bash
cp .env.example .env
# Editar .env y agregar JWT_SECRET
```

### Error: "EADDRINUSE: address already in use"

Problema: El puerto 4000 ya está en uso.

Solución 1: Matar el proceso:
```bash
lsof -ti:4000 | xargs kill -9
```

Solución 2: Cambiar puerto en `.env`:
```bash
echo "PORT=4001" >> .env
```

### Error: "Cannot resolve module 'crypto'"

Problema: crypto es un módulo nativo de Node.js, no necesita instalación.

Solución: Asegúrate de tener Node.js >= 18:
```bash
node -v
```

### La base de datos no se crea

Problema: Permisos o path incorrecto.

Solución:
```bash
# Crear carpeta manualmente
mkdir -p src/database

# Verificar permisos
chmod 755 src/database

# Reiniciar servidor
npm run dev
```

---

## Usar con Postman/Thunder Client

### 1 Crear Colección "SommelIAr"

### 2 Variables de Colección
- `baseUrl`: `http://localhost:4000`
- `token`: (se llenará después del login)

### 3 Requests

#### Register
```
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

#### Login
```
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

Guardar el token en la variable de colección.

#### Get Wines
```
GET {{baseUrl}}/api/wines
Authorization: Bearer {{token}}
```

#### Create Wine
```
POST {{baseUrl}}/api/wines
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Catena Zapata Malbec",
  "grape": "Malbec",
  "year": 2020,
  "rating": 4.8,
  "country": "Argentina"
}
```

---

## Estructura de Archivos Esperada

```
backend/
├── src/
│   ├── index.js
│   ├── database/
│   │   ├── db.js
│   │   └── sommelier.db (se crea automáticamente)
│   ├── models/
│   │   ├── userModel.js
│   │   └── wineModel.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── wineController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   └── wineRoutes.js
│   └── middlewares/
│       ├── authMiddleware.js
│       ├── errorHandler.js
│       ├── requestLogger.js
│       └── validateWine.js
├── .env
├── .env.example
├── package.json
├── test-auth.sh
└── AUTH_GUIDE.md
```

---

## Checklist de Verificación

Antes de empezar a trabajar, verifica:

- [x] Node.js >= 18 instalado (`node -v`)
- [x] npm instalado (`npm -v`)
- [x] Dependencias instaladas (`ls node_modules`)
- [x] Archivo `.env` existe y tiene JWT_SECRET
- [x] Servidor corriendo (`npm run dev`)
- [x] Base de datos inicializada (tabla users)

Para verificar funcionamiento:
- [x] POST /api/auth/register → Crea usuario
- [x] POST /api/auth/login → Retorna token
- [x] GET /api/wines sin token → 401
- [x] GET /api/wines con token → 200 + vinos del usuario
- [x] POST /api/wines con token → 201 (crea vino)
- [x] Dos usuarios ven solo sus propios vinos

---

## Flujo Completo de Desarrollo

```bash
# 1. Setup inicial
cd backend
npm install
cp .env.example .env
# Editar .env

# 2. Iniciar servidor
npm run dev

# 3. (En otra terminal) Probar
chmod +x test-auth.sh
./test-auth.sh

# 4. Desarrollo
# Editar archivos en src/
# Nodemon reinicia automáticamente

# 5. Ver logs
# Los logs aparecen en la terminal del servidor
```

---

## Próximos Pasos

Una vez que el backend funciona:

1. Conectar frontend React
2. Implementar formularios de registro/login
3. Guardar token en localStorage
4. Agregar axios con interceptors
5. Proteger rutas en frontend
6. Agregar funcionalidad de IA (próximo)

---

## Documentación Relacionada

- `AUTH_GUIDE.md` - Guía completa de autenticación
- `AUTH_IMPLEMENTATION_SUMMARY.md` - Resumen de implementación
- `README.md` - Documentación general
- `API_TESTS.md` - Ejemplos de todos los endpoints

---

## Tips

### Desarrollo
- Usa Postman/Thunder Client para probar endpoints
- Guarda el token en variables de colección
- Los logs muestran cada request en tiempo real

### Seguridad
- Nunca commitees el archivo `.env`
- Usa JWT_SECRET diferentes en dev/prod
- Los tokens expiran en 1 hora (configurado en authController.js)

### Base de Datos
- SQLite crea el archivo automáticamente
- Para resetear: elimina `src/database/sommelier.db`
- Para ver datos: usa DB Browser for SQLite

---

¿Todo listo? Ejecuta `npm run dev` y comienza a desarrollar!
