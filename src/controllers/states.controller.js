import { pool } from "@config/database.js";

export const getAllStates = async (req, res) => {
  try {
    const queryText = `
      SELECT codigo_estado, nombre_estado 
      FROM estados 
      ORDER BY nombre_estado`;
    
    const { rows } = await pool.query(queryText);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT codigo_estado, nombre_estado 
      FROM estados 
      WHERE codigo_estado = $1`;
    
    const { rows } = await pool.query(queryText, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Estado no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCitiesByState = async (req, res) => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT codigo_ciudad, nombre_ciudad 
      FROM ciudades 
      WHERE codigo_estado = $1 
      ORDER BY nombre_ciudad`;
    
    const { rows } = await pool.query(queryText, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMunicipiosByState = async (req, res) => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT codigo_municipio, nombre_municipio
      FROM municipios
      WHERE codigo_estado = $1
      ORDER BY nombre_municipio`;
    
    const { rows } = await pool.query(queryText, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAsentamientosByState = async (req, res) => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT DISTINCT cp.nombre_asentamiento, t.nombre_tipo_asentamiento
      FROM codigos_postales cp
      LEFT JOIN tipos_asentamiento t ON cp.codigo_tipo_asentamiento = t.codigo_tipo_asentamiento
      WHERE cp.codigo_estado = $1
      ORDER BY cp.nombre_asentamiento`;
    
    const { rows } = await pool.query(queryText, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  