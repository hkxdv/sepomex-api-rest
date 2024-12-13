/**
 * archivo: config.ts
 * descripción: configuración de variables de entorno para el proyecto
 */

// Server
export const PORT: string | number = process.env.PORT || 3000;
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const API_URL: string | undefined = process.env.API_URL;
export const TIMEZONE: string | undefined = process.env.TIMEZONE;

export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: string = process.env.DB_PORT || "5432";
export const DB_NAME: string = process.env.DB_NAME || "sepomex_db";
export const DB_USER: string | undefined = process.env.DB_USER;
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;

// Security
export const RATE_LIMIT: number = parseInt(process.env.RATE_LIMIT || "1000");
export const CORS_ORIGINS: string = process.env.CORS_ORIGINS || "*";
export const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

// Cache
export const REDIS_HOST: string = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT: number = parseInt(process.env.REDIS_PORT || "6379");
export const CACHE_TTL: number = parseInt(process.env.CACHE_TTL || "3600");

// Database connection string
export const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Environment checks
export const isDevelopment = NODE_ENV === "development";
export const isProduction = NODE_ENV === "production";
export const isTest = NODE_ENV === "test";

// API Rate limiting
export const API_RATE_LIMIT = isProduction ? RATE_LIMIT || 100 : 1000;
export const API_RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutos

// CORS configuration
export const CORS_CONFIG = {
  origin: isProduction ? CORS_ORIGINS.split(",") : "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
};

// Export default config object
export default {
  port: PORT,
  nodeEnv: NODE_ENV,
  apiUrl: API_URL,
  timezone: TIMEZONE,
  database: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    url: DATABASE_URL,
  },
  security: {
    rateLimit: API_RATE_LIMIT,
    rateLimitWindow: API_RATE_WINDOW_MS,
    cors: CORS_CONFIG,
    jwtSecret: JWT_SECRET,
  },
  cache: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    ttl: CACHE_TTL,
  },
};
