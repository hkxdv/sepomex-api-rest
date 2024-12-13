/**
 * Controlador para manejo de estados
 * Proporciona funcionalidades de consulta de estados y sus relaciones
 * @module StatesController
 */

import { Request, Response } from "express";
import { pool } from "@config/database";
import { StateController, ApiResponse } from "@types";

/**
 * Obtiene todos los estados ordenados alfabéticamente
 *
 * @param req Request sin parámetros
 * @param res Response con array de estados
 *
 * @example
 * GET /api/states
 *
 * @returns {Promise<void>} JSON con lista de estados
 */
export const getAllStates = async (
  req: Request,
  res: Response<ApiResponse<StateController["GetAllResponse"]>>
): Promise<void> => {
  try {
    const queryText = `
      SELECT codigo_estado, nombre_estado 
      FROM estados 
      ORDER BY nombre_estado`;

    const { rows } = await pool.query(queryText);
    res.json({
      success: true,
      message: "Estados obtenidos exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener estados",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene un estado específico por su ID
 *
 * @param req Request con params.id conteniendo el código del estado
 * @param res Response con la información del estado
 *
 * @example
 * GET /api/states/14
 *
 * @returns {Promise<void>} JSON con información del estado
 */
export const getStateById = async (
  req: Request<StateController["Params"]>,
  res: Response<ApiResponse<StateController["GetByIdResponse"]>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT codigo_estado, nombre_estado 
      FROM estados 
      WHERE codigo_estado = $1`;

    const { rows } = await pool.query(queryText, [id]);
    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Estado no encontrado",
      });
    }
    res.json({
      success: true,
      message: "Estado encontrado",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar estado",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene todas las ciudades de un estado específico
 *
 * @param req Request con params.id conteniendo el código del estado
 * @param res Response con array de ciudades del estado
 *
 * @example
 * GET /api/states/14/cities
 *
 * @returns {Promise<void>} JSON con lista de ciudades del estado
 */
export const getCitiesByState = async (
  req: Request<StateController["Params"]>,
  res: Response<ApiResponse<StateController["GetCitiesResponse"]>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT codigo_ciudad, nombre_ciudad 
      FROM ciudades 
      WHERE codigo_estado = $1 
      ORDER BY nombre_ciudad`;

    const { rows } = await pool.query(queryText, [id]);
    res.json({
      success: true,
      message: "Ciudades del estado obtenidas exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener ciudades del estado",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene todos los municipios de un estado específico
 *
 * @param req Request con params.id conteniendo el código del estado
 * @param res Response con array de municipios del estado
 *
 * @example
 * GET /api/states/14/municipios
 *
 * @returns {Promise<void>} JSON con lista de municipios del estado
 */
export const getMunicipiosByState = async (
  req: Request<StateController["Params"]>,
  res: Response<ApiResponse<StateController["GetMunicipiosResponse"]>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT codigo_municipio, nombre_municipio
      FROM municipios
      WHERE codigo_estado = $1
      ORDER BY nombre_municipio`;

    const { rows } = await pool.query(queryText, [id]);
    res.json({
      success: true,
      message: "Municipios del estado obtenidos exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener municipios del estado",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene todos los asentamientos de un estado específico
 *
 * @param req Request con params.id conteniendo el código del estado
 * @param res Response con array de asentamientos del estado
 *
 * @example
 * GET /api/states/14/asentamientos
 *
 * @returns {Promise<void>} JSON con lista de asentamientos del estado
 */
export const getAsentamientosByState = async (
  req: Request<StateController["Params"]>,
  res: Response<ApiResponse<StateController["GetAsentamientosResponse"]>>
): Promise<void> => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT DISTINCT cp.nombre_asentamiento, t.nombre_tipo_asentamiento
      FROM codigos_postales cp
      LEFT JOIN tipos_asentamiento t ON cp.codigo_tipo_asentamiento = t.codigo_tipo_asentamiento
      WHERE cp.codigo_estado = $1
      ORDER BY cp.nombre_asentamiento`;

    const { rows } = await pool.query(queryText, [id]);
    res.json({
      success: true,
      message: "Asentamientos del estado obtenidos exitosamente",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener asentamientos del estado",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
