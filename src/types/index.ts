// Interfaces Base de Datos
interface BaseEntity {
  codigo_estado: string;
}

export interface Estado extends BaseEntity {
  nombre_estado: string;
}

export interface Municipio extends BaseEntity {
  codigo_municipio: string;
  nombre_municipio: string;
}

export interface Ciudad extends BaseEntity {
  codigo_ciudad: string;
  nombre_ciudad: string;
}

export interface CodigoPostal extends BaseEntity {
  codigo_postal: string;
  nombre_asentamiento: string;
  codigo_tipo_asentamiento: string;
  codigo_municipio: string;
  codigo_ciudad?: string;
  id_zona?: number;
}

// Interfaces para Controladores
export interface StateController {
  // Parámetros
  Params: {
    id: string;
  };
  // Respuestas
  GetAllResponse: Estado[];
  GetByIdResponse: Estado;
  GetCitiesResponse: Pick<Ciudad, 'codigo_ciudad' | 'nombre_ciudad'>[];
  GetMunicipiosResponse: Pick<Municipio, 'codigo_municipio' | 'nombre_municipio'>[];
  GetAsentamientosResponse: {
    nombre_asentamiento: string;
    nombre_tipo_asentamiento: string;
  }[];
}

export interface CitiesController {
  // Parámetros
  Params: {
    estado: string;
    ciudad: string;
  };
  // Respuestas
  GetAllResponse: (Ciudad & { nombre_estado: string })[];
  GetByIdResponse: Ciudad & { nombre_estado: string };
  GetColoniasResponse: {
    nombre_asentamiento: string;
    nombre_tipo_asentamiento: string;
    tipo_zona: string;
  }[];
  GetPostalCodesResponse: {
    codigo_postal: string;
  }[];
}

export interface PostalController {
  // Parámetros
  SearchQuery: {
    query: string;
  };
  PostalParams: {
    codigo: string;
  };
  LocationParams: {
    id?: string;
    estado?: string;
    municipio?: string;
    ciudad?: string;
  };
  // Respuestas
  PostalCodeRecord: CodigoPostal & {
    nombre_estado?: string;
    nombre_municipio?: string;
    nombre_ciudad?: string;
    nombre_tipo_asentamiento?: string;
    tipo_zona?: string;
  };
}

// Interfaces de Configuración
export interface DbConfig {
  user?: string;
  password?: string;
  host?: string;
  port?: number;
  database?: string;
  timezone?: string;
}

// Interfaz Respuesta API Global
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
