import { type Request, type Response, Router } from "express";
import config from "../config/config.js";
import citiesRoutes from "./cities.routes.js";
import docsRoutes from "./docs.routes.js";
import postalRoutes from "./postal.routes.js";
import statesRoutes from "./states.routes.js";

const router = Router();

const API_PREFIX = "/api/v1";
const {
	apiUrl: API_URL,
	nodeEnv: NODE_ENV,
	security: { rateLimit: RATE_LIMIT, rateLimitWindow: RATE_LIMIT_WINDOW },
} = config;

router.use(`${API_PREFIX}/postal`, postalRoutes);
router.use(`${API_PREFIX}/states`, statesRoutes);
router.use(`${API_PREFIX}/cities`, citiesRoutes);
router.use(`${API_PREFIX}/docs`, docsRoutes);

router.get(API_PREFIX, (_req: Request, res: Response) => {
	const apiInfo = {
		name: "API SEPOMEX",
		description: "API REST para consulta de códigos postales de México",
		version: "1.0.0",
		status: NODE_ENV,
		baseUrl: API_URL,
		documentation: `${API_URL}/docs`,
		rateLimit: {
			requests: RATE_LIMIT,
			windowMs: `${RATE_LIMIT_WINDOW / 60000} minutos`,
		},
		endpoints: {
			postal: {
				base: `${API_PREFIX}/postal`,
				examples: [
					`${API_PREFIX}/postal/codigo/45050`,
					`${API_PREFIX}/postal/search?q=centro`,
				],
			},
			states: {
				base: `${API_PREFIX}/states`,
				examples: [`${API_PREFIX}/states/14`, `${API_PREFIX}/states/14/cities`],
			},
			cities: {
				base: `${API_PREFIX}/cities`,
				examples: [
					`${API_PREFIX}/cities/14/001`,
					`${API_PREFIX}/cities/14/001/colonias`,
				],
			},
		},
	};

	res.status(200).json(apiInfo);
});

export default router;
