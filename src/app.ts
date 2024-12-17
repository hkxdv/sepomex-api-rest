/**
 * API SEPOMEX - Servicio Postal Mexicano
 * API REST para consulta de códigos postales de México
 */

import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import config from "./config/config.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";

// Importación de rutas
import postalRoutes from "./routes/postal.routes.js";
import statesRoutes from "./routes/states.routes.js";
import citiesRoutes from "./routes/cities.routes.js";
import docsRoutes from "./routes/docs.routes.js";

const {
  port: PORT,
  nodeEnv: NODE_ENV,
  apiUrl: API_URL,
  security: { rateLimit: RATE_LIMIT, cors: CORS_CONFIG },
} = config;

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Middlewares de seguridad y optimización
 */
app.use(helmet());
app.use(compression());
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

/**
 * Rutas de la API
 */
app.use("/api/v1/postal", postalRoutes);
app.use("/api/v1/states", statesRoutes);
app.use("/api/v1/cities", citiesRoutes);
app.use("/api/v1/docs", docsRoutes);

/**
 * Ruta base - Información de la API
 */
app.get("/api/v1", (_req, res) => {
  res.status(200).json({
    name: "API SEPOMEX",
    description: "API REST para consulta de códigos postales de México",
    version: "1.0.0",
    status: NODE_ENV,
    baseUrl: API_URL,
    documentation: `${API_URL}/docs`,
    rateLimit: {
      requests: RATE_LIMIT,
      windowMs: "15 minutos",
    },
    endpoints: {
      postal: {
        base: "/api/v1/postal",
        examples: ["/api/v1/postal/45050", "/api/v1/postal/search?q=centro"],
      },
      states: {
        base: "/api/v1/states",
        examples: ["/api/v1/states/14", "/api/v1/states/14/cities"],
      },
      cities: {
        base: "/api/v1/cities",
        examples: ["/api/v1/cities/14/001", "/api/v1/cities/14/001/colonias"],
      },
    },
  });
});

/**
 * Manejadores de errores
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Inicialización del servidor
 */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`
 API SEPOMEX iniciada en modo ${NODE_ENV}
 Puerto: ${PORT}
 URL Base: ${API_URL}
 Documentación: ${API_URL}/docs
 Límite: ${RATE_LIMIT} peticiones / 15 minutos
    `);
  });
}

export default app;
