import { Router } from "express";
import * as citiesController from "@controllers/cities.controller.js";

const router = Router();

// Ciudades
router.get("/", citiesController.getAllCities);  // /api/v1/cities
router.get("/:estado/:ciudad", citiesController.getCityById);  // /api/v1/cities/07/01

// Relaciones
router.get("/:estado/:ciudad/colonias", citiesController.getColoniasByCity);  // /api/v1/cities/07/01/colonias
router.get("/:estado/:ciudad/codigos", citiesController.getPostalCodesByCity);  // /api/v1/cities/07/01/codigos

export default router;
