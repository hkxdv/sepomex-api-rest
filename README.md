# SEPOMEX API REST

API REST desarrollada con Bun y Express para consultar la base de datos de códigos postales de México (SEPOMEX).

<div align="center">
  <img src="https://img.shields.io/badge/-Bun-000000?style=for-the-badge&logo=bun&labelColor=282c34" style="border-radius: 3px;" />
  <img src="https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&labelColor=282c34" style="border-radius: 3px;" />
  <img src="https://img.shields.io/badge/-Biome-000000?style=for-the-badge&logo=biome&labelColor=282c34" style="border-radius: 3px;" />
  <img src="https://img.shields.io/badge/-Postman-000000?style=for-the-badge&logo=postman&labelColor=282c34" style="border-radius: 3px;" />
</div>

## Características

- Búsqueda por código postal
- Búsqueda por nombre de asentamiento
- Filtros por estado, municipio y ciudad

## Limitaciones

> [!WARNING]
>
> - Los datos pueden contener errores tipográficos
> - No se garantiza la actualización en tiempo real
> - Para uso oficial, se recomienda consultar directamente con SEPOMEX

## Instalación rápida

1. **Clonar el repositorio**

```bash
git clone https://github.com/hk4u-dxv/sepomex-api-rest.git
cd sepomex-api-rest
```

2. **Instalar dependencias**

```bash
bun i
```

> [!NOTE]  
> Se requiere tener Bun instalado. Visita bun.sh para instrucciones de instalación.

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

> [!WARNING]  
> Asegúrate de tener la base de datos creada en PostgreSQL.

4. **Iniciar el servidor**

```bash
bun dev
```

## Endpoints

### Códigos Postales

```http
GET /api/v1/postal/search?q=centro     # Búsqueda por nombre
GET /api/v1/postal/codigo/29000        # Búsqueda por código
GET /api/v1/postal/estado/07           # Filtrar por estado
```

> [!TIP]
> Consulta [endpoints.md](./endpoints.md) para ver todos los endpoints disponibles.

## Estructura Base del Proyecto

```
sepomex-api-rest/
├── node_modules/
├── docs/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── app.ts
├── .env.example
├── .gitignore
├── biome.json
├── bun.lock
├── package.json
├── README.md
└── SEPOMEX API.postman_collection.json
```

## Docs

- [Endpoints API](./docs/endpoints.md)
- [Basic API Docs](./docs/api-docs.md)
- [Code Format](./docs/codigos-formato.md)

## Proyecto Relacionado

- [sepomex-psql-db](https://github.com/hk4u-dxv/sepomex-psql-db) - Base de datos SEPOMEX en PostgreSQL

## 🥷 Autor

<a href="https://github.com/hk4u-dxv">
  <img src="https://img.shields.io/badge/-hk4u--dxv-181717?style=for-the-badge&logo=github&labelColor=282c34" style="border-radius: 3px;" />
</a>
