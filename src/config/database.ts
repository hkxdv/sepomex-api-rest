/**
 * archivo: database.ts
 * descripción: configuración de la conexión a la base de datos
 */

import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from "./config.js";
import pg from "pg";
const { Pool } = pg;
import type { DbConfig } from "../types/index.js";

const config: DbConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT) : undefined,
  database: DB_NAME,
};

export const pool = new Pool(config);
