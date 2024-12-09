/**
 * archivo: app.js
 * descripción: Archivo principal de la aplicación.
 * ejecución: npm run dev || npm run dev:watch
 */
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { PORT } from "@config/config.js";
import postalRoutes from "@routes/postal.routes.js";
import statesRoutes from "@routes/states.routes.js";
import citiesRoutes from "@routes/cities.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api/v1/postal", postalRoutes);
app.use("/api/v1/states", statesRoutes);
app.use("/api/v1/cities", citiesRoutes);

// Ruta base
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    message: "API SEPOMEX",
    version: "1.0.0",
    url: `http://localhost:${PORT}/api/v1`,
  });
});

app.listen(PORT, () => {
  console.log(`\nServidor corriendo correctamente en el puerto ${PORT}`);
  console.log(`\nBase URL: http://localhost:${PORT}/api/v1 \n`);
});
