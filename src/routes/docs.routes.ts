import { Router } from "express";
import { getApiDocs } from "../controllers/docs.controller.js";

const router = Router();

router.get("/docs", getApiDocs);

export default router;
