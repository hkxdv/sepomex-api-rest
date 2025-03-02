import express from "express";
import config from "./config/config.js";
import { configureServer } from "./config/server.config.js";
import {
	errorHandler,
	notFoundHandler,
} from "./middlewares/error.middleware.js";
import routes from "./routes/index.routes.js";

const { port: PORT, nodeEnv: NODE_ENV, apiUrl: API_URL } = config;

const app = express();

// Configuración del servidor
configureServer(app);

// Montaje de rutas
app.use(routes);

// Middlewares de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
if (process.env.NODE_ENV !== "production") {
	app.listen(PORT, () => {
		console.log(`
 Modo: ${NODE_ENV.padEnd(28)}
 Puerto: ${PORT.toString().padEnd(26)}
 URL Base: ${API_URL.padEnd(24)}
 Documentación: ${`${API_URL}/docs`.padEnd(20)}
    `);
	});
}

export default app;
