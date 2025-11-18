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

### 5. Actualizar un vino
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

## Campos obligatorios para crear vino

- `name` (string, no vacío)
- `grape` (string, no vacío)
- `year` (integer, >= 1900)
- `rating` (number, 0-5)

## Ejemplo con cURL

### Crear vino
```bash
curl -X POST http://localhost:4000/api/wines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Catena Zapata Malbec",
    "grape": "Malbec",
    "year": 2019,
    "rating": 4.8,
    "country": "Argentina"
  }'
```

### Listar vinos
```bash
curl http://localhost:4000/api/wines
```

