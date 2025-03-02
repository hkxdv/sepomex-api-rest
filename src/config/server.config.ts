/**
 * archivo: server.config.ts
 * Configuración del servidor Express que incluye:
 * - Seguridad (helmet)
 * - Compresión
 * - CORS
 * - Parser JSON y URL encoded
 * - Logging (morgan)
 * - Rate limiting
 * - Motor de vistas EJS
 */

import { dirname } from "node:path";
import path from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config.js";
import { setupRateLimit } from "./rate-limit.config.js";

const {
	nodeEnv: NODE_ENV,
	security: { cors: CORS_CONFIG },
} = config;

export function configureServer(app: express.Application): void {
	const __dirname = dirname(fileURLToPath(import.meta.url));

	app.use(
		helmet({
			contentSecurityPolicy: NODE_ENV === "production",
			crossOriginEmbedderPolicy: NODE_ENV === "production",
		}),
	);
	app.use(compression());
	app.use(cors(CORS_CONFIG));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
	app.use(setupRateLimit());

	app.set("view engine", "ejs");
	app.set("views", path.join(__dirname, "../views"));
}
