/**
 * archivo: config.js
 * descripción: configuración de variables de entorno para el proyecto
 */

// Validar variables requeridas
const requiredEnvs = [
  'DB_DATABASE',
  'DB_USER',
  'DB_PASSWORD'
];



// Server
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Database
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_DATABASE = process.env.DB_DATABASE;
export const TIMEZONE = process.env.TIMEZONE;

// Frontend
export const FRONTEND_URL = process.env.FRONTEND_URL;
