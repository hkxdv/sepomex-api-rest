/**
 * Rutas para el manejo de códigos postales
 * @module PostalRoutes
 */

import { Router } from "express";
import * as postalController from "@controllers/postal.controller";
import { PostalController } from "@types";

const router: Router = Router();

/**
 * Búsquedas principales
 */

// Búsqueda por nombre de asentamiento
router.get<{}, {}, {}, PostalController["SearchQuery"]>(
  "/search",
  postalController.searchByName
); // /api/postal/search?query=centro

// Búsqueda por código postal específico
router.get<PostalController["PostalParams"]>(
  "/codigo/:codigo",
  postalController.getByPostalCode
); // /api/postal/codigo/45050

/**
 * Filtros por ubicación geográfica
 */

// Filtro por estado
router.get<Pick<PostalController["LocationParams"], "id">>(
  "/estado/:id",
  postalController.getByState
); // /api/postal/estado/14

// Filtro por municipio
router.get<Pick<PostalController["LocationParams"], "estado" | "municipio">>(
  "/municipio/:estado/:municipio",
  postalController.getByMunicipio
); // /api/postal/municipio/14/001

// Filtro por ciudad
router.get<Pick<PostalController["LocationParams"], "estado" | "ciudad">>(
  "/ciudad/:estado/:ciudad",
  postalController.getByCiudad
); // /api/postal/ciudad/14/039

export default router;
