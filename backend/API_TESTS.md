# API de Vinos - Pruebas

## Endpoints disponibles

### 1. Health Check
```bash
GET http://localhost:4000/api/health
```

### 2. Obtener todos los vinos
```bash
GET http://localhost:4000/api/wines
```

### 3. Crear un vino
```bash
POST http://localhost:4000/api/wines
Content-Type: application/json

{
  "name": "Rutini Malbec",
  "winery": "Rutini Wines",
  "grape": "Malbec",
  "year": 2020,
  "country": "Argentina",
  "region": "Mendoza",
  "place": "Bodega Rutini",
  "rating": 4.5,
  "aromas": "Frutas rojas, vainilla",
  "flavors": "Ciruela, chocolate",
  "notes": "Excelente balance",
  "imageUrl": "https://example.com/wine.jpg"
}
```

### 4. Obtener un vino específico
```bash
GET http://localhost:4000/api/wines/{id}
```

### 5. Actualizar un vino (actualización parcial)
```bash
PUT http://localhost:4000/api/wines/{id}
Content-Type: application/json

{
  "rating": 5,
  "notes": "Increíble después de respirar"
}
```

### 6. Eliminar un vino
```bash
DELETE http://localhost:4000/api/wines/{id}
```

**Respuesta exitosa:**
```json
{
  "message": "Wine deleted successfully"
}
```

**Respuesta 404:**
```json
{
  "error": "Wine not found"
}
```

### 7. Consultar con SommelIAr (Generar notas de sommelier)
```bash
POST http://localhost:4000/api/wines/{id}/sommelier
Authorization: Bearer {token}
```

**Descripción:**
Este endpoint genera notas profesionales de sommelier basándose en los datos reales del vino almacenados en SQLite (nombre, bodega, cepa, año, región, aromas, sabores, etc.). Las notas incluyen:
- Información general del vino
- Perfil aromático
- Perfil de sabores
- Recomendaciones de maridaje
- Temperatura de servicio
- Notas personales del usuario

Las notas generadas se persisten automáticamente en el campo `ai_notes` del vino para futuras consultas.

**Respuesta exitosa (200):**
```json
{
  "data": {
    "aiNotes": "🍷 Análisis SommelIAr de \"Rutini Malbec\"\n\n📋 INFORMACIÓN GENERAL:\nBodega: Rutini Wines\nCepa: Malbec\nCosecha: 2020\nOrigen: Mendoza, Argentina\nCalificación personal: 4.5/5 ⭐\n\n👃 PERFIL AROMÁTICO:\nFrutas rojas, vainilla\n\n👅 PERFIL DE SABORES:\nCiruela, chocolate\n\n📝 NOTAS PERSONALES:\nExcelente balance\n\n💡 RECOMENDACIONES DEL SOMMELIER:\nMaridaje: Ideal para acompañar carnes rojas a la parrilla, quesos curados o platos con salsas robustas.\n\nTemperatura de servicio recomendada: 16-18°C (vino tinto)\n\n---\n✨ Estas notas han sido generadas por SommelIAr basándose en tus datos.\n",
    "wine": {
      "id": "uuid-del-vino",
      "userId": "uuid-del-usuario",
      "name": "Rutini Malbec",
      "winery": "Rutini Wines",
      "grape": "Malbec",
      "year": 2020,
      "country": "Argentina",
      "region": "Mendoza",
      "rating": 4.5,
      "aromas": "Frutas rojas, vainilla",
      "flavors": "Ciruela, chocolate",
      "notes": "Excelente balance",
      "aiNotes": "🍷 Análisis SommelIAr...",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  }
}
```

**Respuesta 404:**
```json
{
  "error": "Wine not found"
}
```

**Respuesta 401 (sin autenticación):**
```json
{
  "error": "No token provided"
}
```

## Campos obligatorios

### Para crear vino (POST):
- `name` (string, no vacío)
- `grape` (string, no vacío)
- `year` (integer, >= 1900)
- `rating` (number, 0-5)

### Para actualizar vino (PUT):
- Todos los campos son opcionales (actualización parcial)
- Si se envían, deben cumplir las mismas reglas de validación

## Ejemplos completos con cURL

### 1. Crear un vino
```bash
curl -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Catena Zapata Malbec",
    "grape": "Malbec",
    "year": 2019,
    "rating": 4.8,
    "country": "Argentina",
    "region": "Mendoza"
  }'
```

### 2. Listar todos los vinos
```bash
curl http://localhost:4000/api/wines
```

### 3. Obtener un vino específico (reemplaza ID_DEL_VINO)
```bash
curl http://localhost:4000/api/wines/ID_DEL_VINO
```

### 4. Actualizar un vino (actualización parcial)
```bash
curl -X PUT http://localhost:4000/api/wines/ID_DEL_VINO \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "notes": "Mejoró después de decantar"
  }'
```

### 5. Eliminar un vino
```bash
curl -X DELETE http://localhost:4000/api/wines/ID_DEL_VINO \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

### 6. Consultar con SommelIAr (generar notas)
```bash
curl -X POST http://localhost:4000/api/wines/ID_DEL_VINO/sommelier \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

## Flujo de prueba completo

```bash
# 1. Crear un vino y guardar el ID
RESPONSE=$(curl -s -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luigi Bosca Malbec",
    "grape": "Malbec",
    "year": 2020,
    "rating": 4.5,
    "country": "Argentina"
  }')

echo "Vino creado: $RESPONSE"

# Extraer el ID (necesita jq)
WINE_ID=$(echo $RESPONSE | jq -r '.data.id')
echo "ID del vino: $WINE_ID"

# 2. Listar todos
curl http://localhost:4000/api/wines

# 3. Obtener el vino específico
curl http://localhost:4000/api/wines/$WINE_ID

# 4. Actualizar
curl -X PUT http://localhost:4000/api/wines/$WINE_ID \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "notes": "Excelente con asado"}'

# 5. Verificar actualización
curl http://localhost:4000/api/wines/$WINE_ID

# 6. Eliminar
curl -X DELETE http://localhost:4000/api/wines/$WINE_ID

# 7. Verificar que ya no existe (debe dar 404)
curl http://localhost:4000/api/wines/$WINE_ID
```

## Casos de error

### Crear vino sin campos obligatorios
```bash
curl -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -d '{"name": "Vino sin grape"}'
# Respuesta: 400 Bad Request
```

### Obtener vino inexistente
```bash
curl http://localhost:4000/api/wines/id-inexistente
# Respuesta: 404 Not Found - {"error": "Wine not found"}
```

### Rating inválido
```bash
curl -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "grape": "Malbec",
    "year": 2020,
    "rating": 10
  }'
# Respuesta: 400 Bad Request - rating debe ser entre 0 y 5
```

## Flujo completo con SommelIAr

```bash
# 1. Primero necesitas autenticarte para obtener un token
# (Asegúrate de tener los endpoints de autenticación implementados)

# Registrar usuario
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
TOKEN_RESPONSE=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

echo "Token response: $TOKEN_RESPONSE"

# Extraer el token (necesita jq)
TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.data.token')
echo "Token: $TOKEN"

# 2. Crear un vino con datos completos para SommelIAr
WINE_RESPONSE=$(curl -s -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Rutini Malbec",
    "winery": "Rutini Wines",
    "grape": "Malbec",
    "year": 2020,
    "country": "Argentina",
    "region": "Mendoza",
    "place": "Bodega Rutini",
    "rating": 4.5,
    "aromas": "Frutas rojas maduras, vainilla, especias dulces",
    "flavors": "Ciruela, chocolate negro, café tostado",
    "notes": "Excelente balance entre fruta y roble. Taninos suaves y redondos."
  }')

echo "Vino creado: $WINE_RESPONSE"

# Extraer el ID del vino
WINE_ID=$(echo $WINE_RESPONSE | jq -r '.data.id')
echo "ID del vino: $WINE_ID"

# 3. Consultar con SommelIAr para generar notas profesionales
echo "\n🍷 Consultando con SommelIAr..."
SOMMELIER_RESPONSE=$(curl -s -X POST http://localhost:4000/api/wines/$WINE_ID/sommelier \
  -H "Authorization: Bearer $TOKEN")

echo "Notas del sommelier:"
echo $SOMMELIER_RESPONSE | jq -r '.data.aiNotes'

# 4. Verificar que las notas se guardaron en el vino
echo "\n📋 Verificando vino actualizado..."
curl -s http://localhost:4000/api/wines/$WINE_ID \
  -H "Authorization: Bearer $TOKEN" | jq '.data.aiNotes'

# 5. Crear otro vino con diferente cepa para ver distintas recomendaciones
WINE2_RESPONSE=$(curl -s -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Catena Zapata Chardonnay",
    "winery": "Catena Zapata",
    "grape": "Chardonnay",
    "year": 2021,
    "country": "Argentina",
    "region": "Mendoza",
    "rating": 4.7,
    "aromas": "Frutas tropicales, manzana verde, mantequilla",
    "flavors": "Pera, vainilla, notas cítricas",
    "notes": "Bien equilibrado con final largo"
  }')

WINE2_ID=$(echo $WINE2_RESPONSE | jq -r '.data.id')

# 6. Generar notas para el vino blanco
echo "\n🍷 Consultando SommelIAr para vino blanco..."
curl -s -X POST http://localhost:4000/api/wines/$WINE2_ID/sommelier \
  -H "Authorization: Bearer $TOKEN" | jq -r '.data.aiNotes'
```

## Notas importantes sobre autenticación

⚠️ **Todos los endpoints de vinos requieren autenticación mediante JWT.**

Para probar los endpoints:
1. Primero regístrate o haz login para obtener un token
2. Incluye el token en el header `Authorization: Bearer {token}` en todas las peticiones
3. El token expira después de un tiempo (configurado en el backend)

Si recibes error 401, significa que:
- No incluiste el header de Authorization
- El token es inválido
- El token ha expirado (necesitas hacer login nuevamente)

