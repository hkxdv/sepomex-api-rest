/**
 * Controlador para manejo de ciudades
 * Proporciona funcionalidades de consulta de ciudades y sus relaciones
 * @module CitiesController
 */

import { Request, Response } from "express";
import { pool } from "@config/database";
import { CitiesController, ApiResponse } from "@types";

/**
 * Obtiene todas las ciudades con su información de estado
 *
 * @param req Request sin parámetros
 * @param res Response con array de ciudades y sus estados
 *
 * @example
 * GET /api/cities
 *
 * @returns {Promise<void>} JSON con lista de ciudades
 */
export const getAllCities = async (
  req: Request,
  res: Response<ApiResponse<CitiesController["GetAllResponse"]>>
): Promise<void> => {
  try {
    const queryText = `
      SELECT c.codigo_ciudad, c.nombre_ciudad, 
             e.codigo_estado, e.nombre_estado
      FROM ciudades c
      JOIN estados e ON c.codigo_estado = e.codigo_estado
      ORDER BY e.nombre_estado, c.nombre_ciudad`;

    const { rows } = await pool.query(queryText);
    res.json({
      success: true,
      message: "Ciudades obtenidas exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener ciudades",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene información detallada de una ciudad específica
 *
 * @param req Request con params.estado y params.ciudad
 * @param res Response con información de la ciudad
 *
 * @example
 * GET /api/cities/14/001
 *
 * @returns {Promise<void>} JSON con información de la ciudad
 */
export const getCityById = async (
  req: Request<CitiesController["Params"]>,
  res: Response<ApiResponse<CitiesController["GetByIdResponse"]>>
): Promise<void> => {
  try {
    const { estado, ciudad } = req.params;
    const queryText = `
      SELECT c.*, e.nombre_estado
      FROM ciudades c
      JOIN estados e ON c.codigo_estado = e.codigo_estado
      WHERE c.codigo_estado = $1 AND c.codigo_ciudad = $2`;

    const { rows } = await pool.query(queryText, [estado, ciudad]);
    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Ciudad no encontrada",
      });
    }
    res.json({
      success: true,
      message: "Ciudad encontrada",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar ciudad",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene todas las colonias de una ciudad específica
 *
 * @param req Request con params.estado y params.ciudad
 * @param res Response con array de colonias
 *
 * @example
 * GET /api/cities/14/001/colonias
 *
 * @returns {Promise<void>} JSON con lista de colonias
 */
export const getColoniasByCity = async (
  req: Request<CitiesController["Params"]>,
  res: Response<ApiResponse<CitiesController["GetColoniasResponse"]>>
): Promise<void> => {
  try {
    const { estado, ciudad } = req.params;
    const queryText = `
      SELECT DISTINCT cp.nombre_asentamiento, t.nombre_tipo_asentamiento, z.tipo_zona
      FROM codigos_postales cp
      LEFT JOIN tipos_asentamiento t ON cp.codigo_tipo_asentamiento = t.codigo_tipo_asentamiento
      LEFT JOIN zonas z ON cp.id_zona = z.id_zona
      WHERE cp.codigo_estado = $1 AND cp.codigo_ciudad = $2
      ORDER BY cp.nombre_asentamiento`;

    const { rows } = await pool.query(queryText, [estado, ciudad]);
    res.json({
      success: true,
      message: "Colonias de la ciudad obtenidas exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener colonias de la ciudad",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene todos los códigos postales de una ciudad específica
 *
 * @param req Request con params.estado y params.ciudad
 * @param res Response con array de códigos postales
 *
 * @example
 * GET /api/cities/14/001/postal-codes
 *
 * @returns {Promise<void>} JSON con lista de códigos postales
 */
export const getPostalCodesByCity = async (
  req: Request<CitiesController["Params"]>,
  res: Response<ApiResponse<CitiesController["GetPostalCodesResponse"]>>
): Promise<void> => {
  try {
    const { estado, ciudad } = req.params;
    const queryText = `
      SELECT DISTINCT codigo_postal
      FROM codigos_postales
      WHERE codigo_estado = $1 AND cp.codigo_ciudad = $2
      ORDER BY codigo_postal`;

    const { rows } = await pool.query(queryText, [estado, ciudad]);
    res.json({
      success: true,
      message: "Códigos postales de la ciudad obtenidos exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener códigos postales de la ciudad",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
