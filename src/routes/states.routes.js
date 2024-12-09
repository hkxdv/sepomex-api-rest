import { Router } from "express";
import * as statesController from "@controllers/states.controller.js";

const router = Router();

// Estados
router.get("/", statesController.getAllStates);  // /api/v1/states
router.get("/:id", statesController.getStateById);  // /api/v1/states/07

// Relaciones
router.get("/:id/cities", statesController.getCitiesByState);  // /api/v1/states/07/cities
router.get("/:id/municipios", statesController.getMunicipiosByState);  // /api/v1/states/07/municipios
router.get("/:id/asentamientos", statesController.getAsentamientosByState);  // /api/v1/states/07/asentamientos

export default router;
