/**
 * API SEPOMEX - Servicio Postal Mexicano
 * API REST para consulta de códigos postales, estados, municipios y ciudades de México
 *
 * @module App
 * @version 1.0.0-beta
 */

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Importar configuración usando alias
import config from "@config/config";
const {
  port: PORT,
  nodeEnv: NODE_ENV,
  apiUrl: API_URL,
  security: { rateLimit: RATE_LIMIT, cors: CORS_CONFIG },
} = config;

// Importación de rutas usando alias
import postalRoutes from "@routes/postal.routes";
import statesRoutes from "@routes/states.routes";
import citiesRoutes from "@routes/cities.routes";
import { errorHandler, notFoundHandler } from "@middlewares/error.middleware";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Middlewares globales
 */
app.use(cors(CORS_CONFIG));
app.use(express.json());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

/**
 * Rutas de la API
 */
app.use("/api/v1/postal", postalRoutes);
app.use("/api/v1/states", statesRoutes);
app.use("/api/v1/cities", citiesRoutes);

/**
 * Ruta base - Información de la API
 */
app.get("/api/v1", (_req, res) => {
  res.status(200).json({
    name: "API SEPOMEX",
    description: "API REST para consulta de códigos postales de México",
    version: "1.0.0-beta",
    status: "development",
    environment: NODE_ENV,
    baseUrl: API_URL,
    documentation: NODE_ENV === "production" ? null : "/api/v1/docs",
    rateLimit: {
      requests: RATE_LIMIT,
      windowMs: "15 minutos",
    },
    endpoints: {
      postal: "/api/v1/postal",
      states: "/api/v1/states",
      cities: "/api/v1/cities",
    },
    examples: {
      postal: "/api/v1/postal/45050",
      states: "/api/v1/states/14",
      cities: "/api/v1/cities/14/001",
    },
  });
});

// Manejadores de errores
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Inicialización del servidor
 */
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n🚀 API SEPOMEX iniciada en modo ${NODE_ENV}`);
    console.log(`📡 Puerto: ${PORT}`);
    console.log(`🌐 URL Base: ${API_URL}`);
    if (NODE_ENV !== "production") {
      console.log(`📚 Documentación: ${API_URL}/docs`);
    }
    console.log(`📊 Límite: ${RATE_LIMIT} peticiones / 15 minutos\n`);
  });
}

export default app;
