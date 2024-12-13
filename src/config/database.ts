/**
 * archivo: database.ts
 * descripción: configuración de la conexión a la base de datos
 */

import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  TIMEZONE,
} from "@config/config";
import { Pool } from "pg";
import type { DbConfig } from "@types";

const config: DbConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT) : undefined,
  database: DB_NAME,
  timezone: TIMEZONE,
};

// Verificar configuración requerida antes de crear el pool
if (
  !config.user ||
  !config.password ||
  !config.host ||
  !config.port ||
  !config.database
) {
  throw new Error(
    "Faltan variables de entorno requeridas para la conexión a la base de datos"
  );
}

export const pool = new Pool(config);
