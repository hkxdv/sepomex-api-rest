# SEPOMEX API REST - Formato de Códigos

## Códigos de Estado

- Formato: `XX` (2 dígitos)
- Ejemplo: `07` (Chiapas)
- Rango: `01` a `32`

## Códigos de Municipio

- Formato: `XXX` (3 dígitos con ceros a la izquierda)
- Ejemplo: `001` (Tuxtla Gutiérrez)
- Debe incluir el estado: `07/001`

## Códigos de Ciudad

- Formato: `XX` (2 dígitos con ceros a la izquierda)
- Ejemplo: `01` (Tuxtla Gutiérrez)
- Debe incluir el estado: `07/01`

## Códigos Postales

- Formato: `XXXXX` (5 dígitos)
- Ejemplo: `29000` (Centro, Tuxtla Gutiérrez)

## Ejemplos de Uso

### Consulta por Estado

```http
GET /api/v1/states/07           # Chiapas
```

### Consulta por Municipio

```http
GET /api/v1/postal/municipio/07/001    # Tuxtla Gutiérrez, Chiapas
```

### Consulta por Ciudad

```http
GET /api/v1/cities/07/01               # Tuxtla Gutiérrez, Chiapas
```

### Consulta por Código Postal

```http
GET /api/v1/postal/codigo/29000        # Centro, Tuxtla Gutiérrez
```

## Notas Importantes

- Todos los códigos deben mantener los ceros a la izquierda
- Los códigos son strings, no números
- Los códigos son case-sensitive
- Se debe respetar la jerarquía estado/municipio/ciudad
