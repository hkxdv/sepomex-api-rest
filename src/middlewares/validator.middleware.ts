import type { NextFunction, Request, Response } from "express";
import type { ValidationChain, ValidationError } from "express-validator";
import { validationResult } from "express-validator";

/**
 * Interfaz para el formato de error personalizado
 */
interface CustomValidationError {
	field: string;
	value: string | number | boolean | null | undefined;
	message: string;
}

/**
 * Middleware para validar las peticiones usando express-validator
 * @param validations Array de validaciones de express-validator
 */
export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		// Ejecutar todas las validaciones
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}

		// Si hay errores, devolver respuesta con formato consistente
		res.status(400).json({
			status: "error",
			code: 400,
			message: "Error de validación",
			errors: errors.array().map(
				(err: ValidationError): CustomValidationError => ({
					field: err.type === "field" ? err.path : err.type,
					value: err.type === "field" ? err.value : undefined,
					message: err.msg,
				}),
			),
			path: req.originalUrl,
			timestamp: new Date().toISOString(),
		});
	};
};
