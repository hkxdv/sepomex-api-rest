import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

/**
 * Middleware para manejar rutas no encontradas
 * @param req Request de Express
 * @param res Response de Express
 * @param next Función Next de Express
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Ruta no encontrada",
    path: req.originalUrl,
  });
};

/**
 * Middleware para manejar errores generales
 * @param err Error capturado
 * @param req Request de Express
 * @param res Response de Express
 * @param next Función Next de Express
 */
export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: "error",
    code: err.status || 500,
    message: err.message || "Error interno del servidor",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};
