/**
 * Rutas para el manejo de estados
 * @module StatesRoutes
 */

import { Router } from "express";
import * as statesController from "../controllers/states.controller.js";
import type { StateController } from "../types/index.js";

const router: Router = Router();

/**
 * Rutas principales de estados
 */

// Obtener todos los estados
router.get("/", statesController.getAllStates); // /api/v1/states

// Obtener estado específico
router.get<StateController["Params"]>("/:id", statesController.getStateById); // /api/v1/states/07

/**
 * Rutas para relaciones de estados
 */

// Obtener ciudades de un estado
router.get<StateController["Params"]>(
	"/:id/cities",
	statesController.getCitiesByState,
); // /api/v1/states/07/cities

// Obtener municipios de un estado
router.get<StateController["Params"]>(
	"/:id/municipios",
	statesController.getMunicipiosByState,
); // /api/v1/states/07/municipios

// Obtener asentamientos de un estado
router.get<StateController["Params"]>(
	"/:id/asentamientos",
	statesController.getAsentamientosByState,
); // /api/v1/states/07/asentamientos

export default router;
