/**
 * Controlador para manejo de códigos postales
 * Proporciona funcionalidades de búsqueda y filtrado de códigos postales
 * @module PostalController
 */

import { Request, Response } from "express";
import { pool } from "@config/database";
import { PostalController, ApiResponse } from "@types";

/**
 * Busca asentamientos por nombre
 * @param req Request con query.query conteniendo el término de búsqueda
 * @param res Response con array de códigos postales que coinciden
 *
 * @example
 * GET /api/postal/search?query=centro
 *
 * @returns {Promise<void>} JSON con:
 * - success: boolean indicando éxito de la operación
 * - message: mensaje descriptivo
 * - data: array de registros encontrados
 * - error?: mensaje de error si ocurre
 */
export const searchByName = async (
  req: Request<{}, {}, {}, PostalController["SearchQuery"]>,
  res: Response<ApiResponse<PostalController["PostalCodeRecord"][]>>
): Promise<void> => {
  try {
    const { query } = req.query;
    // Consulta SQL con JOINS para obtener información relacionada
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.nombre_asentamiento ILIKE $1`;

    const { rows } = await pool.query<PostalController["PostalCodeRecord"]>(
      queryText,
      [`%${query}%`] // Búsqueda parcial case-insensitive
    );

    res.json({
      success: true,
      message: "Búsqueda realizada con éxito",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error en la búsqueda",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene información detallada de un código postal específico
 * Incluye datos del estado, municipio, ciudad, tipo de asentamiento y zona
 *
 * @param req Request con params.codigo conteniendo el código postal
 * @param res Response con la información detallada del código postal
 *
 * @example
 * GET /api/postal/45050
 *
 * @returns {Promise<void>} JSON con información completa del código postal
 */
export const getByPostalCode = async (
  req: Request<PostalController["PostalParams"]>,
  res: Response<ApiResponse<PostalController["PostalCodeRecord"][]>>
): Promise<void> => {
  try {
    const { codigo } = req.params;
    // Consulta SQL con múltiples JOINS para obtener información completa
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad, 
             t.nombre_tipo_asentamiento, z.tipo_zona
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      LEFT JOIN tipos_asentamiento t ON cp.codigo_tipo_asentamiento = t.codigo_tipo_asentamiento
      LEFT JOIN zonas z ON cp.id_zona = z.id_zona
      WHERE cp.codigo_postal = $1`;

    const { rows } = await pool.query<PostalController["PostalCodeRecord"]>(
      queryText,
      [codigo]
    );
    res.json({
      success: true,
      message: "Código postal encontrado",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar código postal",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene todos los códigos postales de un estado específico
 *
 * @param req Request con params.id conteniendo el código del estado
 * @param res Response con array de códigos postales del estado
 *
 * @example
 * GET /api/postal/state/14
 *
 * @returns {Promise<void>} JSON con códigos postales del estado
 */
export const getByState = async (
  req: Request<Pick<PostalController["LocationParams"], "id">>,
  res: Response<ApiResponse<PostalController["PostalCodeRecord"][]>>
): Promise<void> => {
  try {
    const { id } = req.params;
    // Consulta filtrada por estado
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.codigo_estado = $1`;

    const { rows } = await pool.query<PostalController["PostalCodeRecord"]>(
      queryText,
      [id]
    );
    res.json({
      success: true,
      message: "Códigos postales del estado encontrados",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar códigos postales del estado",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene códigos postales por municipio
 * Filtra por estado y municipio para obtener resultados específicos
 *
 * @param req Request con params.estado y params.municipio
 * @param res Response con array de códigos postales del municipio
 *
 * @example
 * GET /api/postal/municipio/14/001
 *
 * @returns {Promise<void>} JSON con códigos postales del municipio
 */
export const getByMunicipio = async (
  req: Request<
    Pick<PostalController["LocationParams"], "estado" | "municipio">
  >,
  res: Response<ApiResponse<PostalController["PostalCodeRecord"][]>>
): Promise<void> => {
  try {
    const { estado, municipio } = req.params;
    // Consulta filtrada por estado y municipio
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.codigo_estado = $1 AND cp.codigo_municipio = $2`;

    const { rows } = await pool.query<PostalController["PostalCodeRecord"]>(
      queryText,
      [estado, municipio]
    );
    res.json({
      success: true,
      message: "Códigos postales del municipio encontrados",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar códigos postales del municipio",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

/**
 * Obtiene códigos postales por ciudad
 * Filtra por estado y ciudad para obtener resultados específicos
 *
 * @param req Request con params.estado y params.ciudad
 * @param res Response con array de códigos postales de la ciudad
 *
 * @example
 * GET /api/postal/ciudad/14/001
 *
 * @returns {Promise<void>} JSON con códigos postales de la ciudad
 */
export const getByCiudad = async (
  req: Request<Pick<PostalController["LocationParams"], "estado" | "ciudad">>,
  res: Response<ApiResponse<PostalController["PostalCodeRecord"][]>>
): Promise<void> => {
  try {
    const { estado, ciudad } = req.params;
    // Consulta filtrada por estado y ciudad
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.codigo_estado = $1 AND cp.codigo_ciudad = $2`;

    const { rows } = await pool.query<PostalController["PostalCodeRecord"]>(
      queryText,
      [estado, ciudad]
    );
    res.json({
      success: true,
      message: "Códigos postales de la ciudad encontrados",
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar códigos postales de la ciudad",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
