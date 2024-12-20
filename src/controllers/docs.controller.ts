import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";

export const getApiDocs = async (_req: Request, res: Response) => {
  try {
    const docsPath = path.join(process.cwd(), "docs");

    const [apiDocs, codigosFormato, endpoints] = await Promise.all([
      fs.readFile(path.join(docsPath, "api-docs.md"), "utf-8"),
      fs.readFile(path.join(docsPath, "codigos-formato.md"), "utf-8"),
      fs.readFile(path.join(docsPath, "endpoints.md"), "utf-8"),
    ]);

    res.json({
      nombre: "SEPOMEX API REST",
      version: "1.0.0",
      documentacion: {
        general: apiDocs,
        formatoCodigos: codigosFormato,
        endpoints: endpoints,
      },
      baseUrl: "http://localhost:3000/api/v1",
      autenticacion: "No requiere autenticación - API de acceso público",
      formatos: {
        contentType: "application/json",
        accept: "application/json",
      },
      codigosEstado: {
        200: "Petición exitosa",
        400: "Error en los parámetros de la petición",
        404: "Recurso no encontrado",
        500: "Error del servidor",
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al cargar la documentación",
      detalles: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
