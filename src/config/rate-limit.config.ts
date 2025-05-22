/**
 * rate-limit.config.ts
 * configuración del rate limit para la API
 */

import rateLimit from "express-rate-limit";
import config from "./config.js";

const {
	security: { rateLimit: RATE_LIMIT, rateLimitWindow: RATE_LIMIT_WINDOW },
} = config;

export function setupRateLimit() {
	return rateLimit({
		windowMs: RATE_LIMIT_WINDOW,
		max: RATE_LIMIT,
		message: {
			success: false,
			message: "Demasiadas peticiones, por favor intente más tarde",
			error: "Rate limit exceeded",
		},
	});
}
