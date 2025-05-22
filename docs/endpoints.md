# SEPOMEX API REST - Endpoints

## Colección de Endpoints en Postman

Para facilitar las pruebas y la integración, proporcionamos una colección completa de Postman con todos los endpoints disponibles.

### Detalles de la Colección

- **Nombre**: SEPOMEX API
- **Descripción**: API REST para consulta de códigos postales de México
- **Archivo**: [SEPOMEX API.postman_collection.json](https://github.com/hk4u-dxv/sepomex-api-rest/blob/typescript/SEPOMEX%20API.postman_collection.json)

### Contenido

La colección incluye:

- Todos los Endpoints disponibles para búsqueda de códigos postales, consulta de estados y ciudades
- Variables de entorno preconfiguradas
- Ejemplos de respuestas

Para usar la colección:

1. Descargue el archivo JSON
2. Importe la colección en Postman
3. Configure la variable de entorno `baseUrl` (por defecto: `http://localhost:3000`)

## Códigos Postales

### Búsqueda por Nombre

```http
GET http://localhost:3000/api/v1/postal/search?q=:nombre
name: "Buscar asentamientos por nombre"
description: "Búsqueda de asentamientos por nombre (case-insensitive)"
controller: searchByName
example: http://localhost:3000/api/v1/postal/search?q=centro
```

### Búsqueda por Código Postal

```http
GET http://localhost:3000/api/v1/postal/codigo/:codigo
name: "Buscar por código postal"
description: "Obtiene información detallada de un código postal específico"
controller: getByPostalCode
example: http://localhost:3000/api/v1/postal/codigo/29000
```

### Filtros por Estado

```http
GET http://localhost:3000/api/v1/postal/estado/:estado
name: "Códigos postales por estado"
description: "Lista todos los códigos postales de un estado"
controller: getByState
example: http://localhost:3000/api/v1/postal/estado/09
```

### Filtros por Municipio

```http
GET http://localhost:3000/api/v1/postal/municipio/:estado/:municipio
name: "Códigos postales por municipio"
description: "Lista todos los códigos postales de un municipio específico"
controller: getByMunicipio
example: http://localhost:3000/api/v1/postal/municipio/07/001
```

### Filtros por Ciudad

```http
GET http://localhost:3000/api/v1/postal/ciudad/:estado/:ciudad
name: "Códigos postales por ciudad"
description: "Lista todos los códigos postales de una ciudad específica"
controller: getByCiudad
example: http://localhost:3000/api/v1/postal/ciudad/09/01
```

## Estados

### Lista de Estados

```http
GET http://localhost:3000/api/v1/states
name: "Obtener todos los estados"
description: "Lista completa de estados ordenados por nombre"
controller: getAllStates
```

### Detalle de Estado

```http
GET http://localhost:3000/api/v1/states/:id
name: "Obtener estado por ID"
description: "Información detallada de un estado específico"
controller: getStateById
example: http://localhost:3000/api/v1/states/09
```

### Ciudades por Estado

```http
GET http://localhost:3000/api/v1/states/:id/cities
name: "Ciudades por estado"
description: "Lista todas las ciudades de un estado específico"
controller: getCitiesByState
example: http://localhost:3000/api/v1/states/07/cities
```

### Municipios por Estado

```http
GET http://localhost:3000/api/v1/states/:id/municipios
name: "Municipios por estado"
description: "Lista todos los municipios de un estado específico"
controller: getMunicipiosByState
example: http://localhost:3000/api/v1/states/07/municipios
```

### Asentamientos por Estado

```http
GET http://localhost:3000/api/v1/states/:id/asentamientos
name: "Asentamientos por estado"
description: "Lista todos los asentamientos de un estado específico"
controller: getAsentamientosByState
example: http://localhost:3000/api/v1/states/07/asentamientos
```

## Ciudades

### Lista de Ciudades

```http
GET http://localhost:3000/api/v1/cities
name: "Obtener todas las ciudades"
description: "Lista completa de ciudades ordenadas por estado y nombre"
controller: getAllCities
```

### Detalle de Ciudad

```http
GET http://localhost:3000/api/v1/cities/:estado/:ciudad
name: "Obtener ciudad por ID"
description: "Información detallada de una ciudad específica"
controller: getCityById
example: http://localhost:3000/api/v1/cities/07/01
```

### Colonias por Ciudad

```http
GET http://localhost:3000/api/v1/cities/:estado/:ciudad/colonias
name: "Colonias por ciudad"
description: "Lista todas las colonias/asentamientos de una ciudad específica"
controller: getColoniasByCity
example: http://localhost:3000/api/v1/cities/07/01/colonias
```

### Códigos Postales por Ciudad

```http
GET http://localhost:3000/api/v1/cities/:estado/:ciudad/codigos
name: "Códigos postales por ciudad"
description: "Lista todos los códigos postales de una ciudad específica"
controller: getPostalCodesByCity
example: http://localhost:3000/api/v1/cities/07/01/codigos
```
