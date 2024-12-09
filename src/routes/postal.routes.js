import { Router } from "express";
import * as postalController from "@controllers/postal.controller.js";

const router = Router();

// Búsquedas principales
router.get("/search", postalController.searchByName); // /api/v1/postal/search?q=centro
router.get("/codigo/:codigo", postalController.getByPostalCode); // /api/v1/postal/codigo/29000

// Filtros por ubicación
router.get("/estado/:id", postalController.getByState); // /api/v1/postal/estado/07
router.get("/municipio/:estado/:municipio", postalController.getByMunicipio); // /api/v1/postal/municipio/07/001
router.get("/ciudad/:estado/:ciudad", postalController.getByCiudad); // /api/v1/postal/ciudad/07/01

export default router;
