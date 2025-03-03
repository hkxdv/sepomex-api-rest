# SEPOMEX API REST

API REST desarrollada con Bun y Express para consultar la base de datos de códigos postales de México (SEPOMEX).

<div align="center">
  <img src="https://img.shields.io/badge/-Bun-000000?style=for-the-badge&logo=bun&labelColor=282c34" style="border-radius: 3px;" />
  <img src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&labelColor=282c34" style="border-radius: 3px;" />
  <img src="https://img.shields.io/badge/-Biome-000000?style=for-the-badge&logo=biome&labelColor=282c34" style="border-radius: 3px;" />
  <img src="https://img.shields.io/badge/-Postman-000000?style=for-the-badge&logo=postman&labelColor=282c34" style="border-radius: 3px;" />
</div>

## Fuente de Datos

Los datos originales provienen del Servicio Postal Mexicano (SEPOMEX) a través de su página oficial, aunque fueron obtenidos de [VIDELCLOUD](https://videlcloud.wordpress.com/2017/01/17/descarga-la-base-de-datos-de-codigos-postales-colonias-municipios-y-estados-de-todo-mexico/) que mantiene una copia actualizada al 2021-10-01.

> [!NOTE]
>
> - Última actualización: 2021-10-01
> - Incluye códigos postales, colonias y municipios de todo México
> - Los asentamientos pueden ser: colonias, fraccionamientos, barrios, ejidos, etc.
> - Se conservan acentos y caracteres especiales en los nombres

## Estructura del Proyecto

```
sepomex-api-rest/
├── docs/
│   ├── endpoints.md
│   ├── api-docs.md
│   └── codigos-formato.md
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── app.ts
│
├── .env.example
├── .gitignore
├── biome.json
├── bun.lock
├── package.json
└── SEPOMEX API.postman_collection.json
```

## Instalación

### Requisitos previos

- Bun instalado (visita [bun.sh](https://bun.sh) para instrucciones)
- Base de datos PostgreSQL con datos de SEPOMEX
- Postman (opcional, para pruebas)

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/hk4u-dxv/sepomex-api-rest.git
cd sepomex-api-rest
```

### Paso 2: Instalar dependencias

```bash
bun i
```

### Paso 3: Configurar variables de entorno

```bash
cp .env.example .env.development
```

> [!IMPORTANT]
> Es necesario configurar correctamente las variables de entorno, especialmente las credenciales de la base de datos PostgreSQL.

### Paso 4: Iniciar el servidor

```bash
bun dev
```

## Uso y endpoints

Ejemplos de los principales endpoints:

```http
# Búsqueda por nombre de asentamiento
GET /api/v1/postal/search?q=centro

# Búsqueda por código postal
GET /api/v1/postal/codigo/29000

# Filtrar por estado
GET /api/v1/postal/estado/07

# Filtrar por estado y municipio
GET /api/v1/postal/estado/07/municipio/101
```

Consulta el archivo `docs/endpoints.md` para ver todos los endpoints disponibles.

## Características

La API proporciona las siguientes funcionalidades:

1. **Búsqueda de códigos postales**: Obtener información completa a partir de un código postal
2. **Búsqueda por nombre**: Encontrar asentamientos por nombre o parte del nombre
3. **Filtrado geográfico**: Filtrar por estado, municipio o ciudad
4. **Formato unificado**: Respuestas JSON con formato consistente
5. **Validación**: Verificación de existencia y formato de códigos postales
6. **Documentación completa**: Endpoints documentados y colección de Postman

> [!WARNING]
>
> - Los datos pueden contener errores tipográficos
> - No se garantiza la actualización en tiempo real
> - Para uso oficial, se recomienda consultar directamente con SEPOMEX
> - Este proyecto es una implementación de referencia y educativa

## Estructura de los datos

La API consume una base de datos PostgreSQL con las siguientes tablas principales:

1. **estados**: Catálogo de estados de México
2. **municipios**: Catálogo de municipios con relación a estados
3. **ciudades**: Ciudades importantes con relación a estados
4. **tipos_asentamiento**: Catálogo de tipos de asentamiento (colonia, barrio, etc.)
5. **zonas**: Clasificación de zonas (Urbana, Rural, Semiurbana)
6. **codigos_postales**: Tabla principal con todos los códigos postales y sus relaciones

Para más detalles sobre la estructura de la base de datos, consulta el proyecto relacionado.

## Proyecto Relacionado

Esta API utiliza la base de datos estructurada en el proyecto:

<a href="https://github.com/hk4u-dxv/sepomex-psql-db">
  <img src="https://img.shields.io/badge/-sepomex--psql--db-000000?style=for-the-badge&logo=github&labelColor=282c34" style="border-radius: 3px;" />
</a>

La base de datos proporciona:

- Estructura optimizada en PostgreSQL
- Scripts de importación de datos
- Consultas SQL de ejemplo
- Datos completos de códigos postales de México

## 🥷 Autor

<a href="https://github.com/hk4u-dxv">
  <img src="https://img.shields.io/badge/-hk4u--dxv-000000?style=for-the-badge&logo=github&labelColor=282c34" style="border-radius: 3px;" />
</a>
