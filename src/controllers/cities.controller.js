import { pool } from "@config/database.js";

export const getAllCities = async (req, res) => {
  try {
    const queryText = `
      SELECT c.codigo_ciudad, c.nombre_ciudad, 
             e.codigo_estado, e.nombre_estado
      FROM ciudades c
      JOIN estados e ON c.codigo_estado = e.codigo_estado
      ORDER BY e.nombre_estado, c.nombre_ciudad`;
    
    const { rows } = await pool.query(queryText);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCityById = async (req, res) => {
  try {
    const { estado, ciudad } = req.params;
    const queryText = `
      SELECT c.*, e.nombre_estado
      FROM ciudades c
      JOIN estados e ON c.codigo_estado = e.codigo_estado
      WHERE c.codigo_estado = $1 AND c.codigo_ciudad = $2`;
    
    const { rows } = await pool.query(queryText, [estado, ciudad]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getColoniasByCity = async (req, res) => {
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
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostalCodesByCity = async (req, res) => {
  try {
    const { estado, ciudad } = req.params;
    const queryText = `
      SELECT DISTINCT codigo_postal
      FROM codigos_postales
      WHERE codigo_estado = $1 AND codigo_ciudad = $2
      ORDER BY codigo_postal`;
    
    const { rows } = await pool.query(queryText, [estado, ciudad]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
