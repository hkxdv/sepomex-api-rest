# SEPOMEX API REST - Documentación básica

## Información General

### Base URL

```http
http://localhost:3000/api/v1
```

### Autenticación

- No requiere autenticación
- API de acceso público

### Headers

```http
Content-Type: application/json
Accept: application/json
```

### Códigos de Estado HTTP

- `200 OK`: Petición exitosa
- `400 Bad Request`: Error en los parámetros de la petición
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

### Formato de Errores

```json
{
  "error": "Mensaje descriptivo del error",
  "details": "Detalles adicionales"
}
```

## Ejemplos de Errores

### Error 400 - Parámetro Inválido

```json
{
  "error": "Parámetro inválido",
  "details": "El código postal debe contener 5 dígitos"
}
```

### Error 404 - No Encontrado

```json
{
  "error": "Recurso no encontrado",
  "details": "No se encontró el estado con código: 99"
}
```

### Error 500 - Error del Servidor

```json
{
  "error": "Error interno del servidor",
  "details": "Error en la conexión a la base de datos"
}
```
