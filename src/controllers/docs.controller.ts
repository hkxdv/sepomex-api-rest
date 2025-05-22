import fs from "node:fs/promises";
import path from "node:path";
import type { Request, Response } from "express";
import { marked } from "marked";

export const getApiDocs = async (_req: Request, res: Response) => {
	try {
		const docsPath = path.join(process.cwd(), "docs");

		// Leer archivos markdown
		const [apiDocs, codigosFormato, endpoints] = await Promise.all([
			fs.readFile(path.join(docsPath, "api-docs.md"), "utf-8"),
			fs.readFile(path.join(docsPath, "codigos-formato.md"), "utf-8"),
			fs.readFile(path.join(docsPath, "endpoints.md"), "utf-8"),
		]);

		// Convertir Markdown a HTML
		const documentation = {
			general: marked(apiDocs),
			formatoCodigos: marked(codigosFormato),
			endpoints: marked(endpoints),
		};

		res.render("docs", {
			title: "SEPOMEX API REST Docs",
			version: "1.0.0",
			documentation,
			baseUrl: process.env.API_URL || "http://localhost:3000/api/v1",
			meta: {
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
			},
		});
	} catch (error) {
		res.status(500).json({
			error: "Error al cargar la documentación",
			detalles: error instanceof Error ? error.message : "Error desconocido",
		});
	}
};
