/**
 * archivo: database.js
 * descripción: configuración de la conexión a la base de datos
 */

import pg from "pg";
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  TIMEZONE,
} from "@config/config.js";

export const pool = new pg.Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  timezone: TIMEZONE,
});
