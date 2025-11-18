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
curl -X DELETE http://localhost:4000/api/wines/ID_DEL_VINO
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

