/**
 * Rutas para el manejo de ciudades
 * @module CitiesRoutes
 */

import { Router } from "express";
import { param } from "express-validator";
import * as citiesController from "../controllers/cities.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import type { CitiesController } from "../types/index.js";

const router: Router = Router();

/**
 * Validaciones comunes para parámetros de estado y ciudad
 */
const cityParamsValidation = [
	param("estado")
		.isString()
		.trim()
		.isLength({ min: 2, max: 2 })
		.matches(/^[0-9]+$/)
		.withMessage("El código de estado debe ser un número de 2 dígitos"),
	param("ciudad")
		.isString()
		.trim()
		.isLength({ min: 3, max: 3 })
		.matches(/^[0-9]+$/)
		.withMessage("El código de ciudad debe ser un número de 3 dígitos"),
];

/**
 * Rutas principales de ciudades
 */

// Obtener todas las ciudades
router.get("/", citiesController.getAllCities);

// Obtener ciudad específica
router.get<CitiesController["Params"]>(
	"/:estado/:ciudad",
	validate(cityParamsValidation),
	citiesController.getCityById,
);

/**
 * Rutas para relaciones de ciudades
 */

// Obtener colonias de una ciudad
router.get<CitiesController["Params"]>(
	"/:estado/:ciudad/colonias",
	validate(cityParamsValidation),
	citiesController.getColoniasByCity,
);

// Obtener códigos postales de una ciudad
router.get<CitiesController["Params"]>(
	"/:estado/:ciudad/codigos",
	validate(cityParamsValidation),
	citiesController.getPostalCodesByCity,
);

export default router;
