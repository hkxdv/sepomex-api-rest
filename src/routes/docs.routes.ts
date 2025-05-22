import { Router } from "express";
import { getApiDocs } from "../controllers/docs.controller.js";

const router: Router = Router();

/**
 * Renderiza la documentación en HTML
 */
router.get("/", getApiDocs);

export default router;
