import { pool } from "@config/database.js";

export const searchByName = async (req, res) => {
  try {
    const { q } = req.query;
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.nombre_asentamiento ILIKE $1`;
    
    const { rows } = await pool.query(queryText, [`%${q}%`]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByPostalCode = async (req, res) => {
  try {
    const { codigo } = req.params;
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
    
    const { rows } = await pool.query(queryText, [codigo]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByState = async (req, res) => {
  try {
    const { id } = req.params;
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.codigo_estado = $1`;
    
    const { rows } = await pool.query(queryText, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByMunicipio = async (req, res) => {
  try {
    const { estado, municipio } = req.params;
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.codigo_estado = $1 AND cp.codigo_municipio = $2`;
    
    const { rows } = await pool.query(queryText, [estado, municipio]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByCiudad = async (req, res) => {
  try {
    const { estado, ciudad } = req.params;
    const queryText = `
      SELECT cp.*, e.nombre_estado, m.nombre_municipio, c.nombre_ciudad
      FROM codigos_postales cp
      LEFT JOIN estados e ON cp.codigo_estado = e.codigo_estado
      LEFT JOIN municipios m ON cp.codigo_municipio = m.codigo_municipio 
        AND cp.codigo_estado = m.codigo_estado
      LEFT JOIN ciudades c ON cp.codigo_ciudad = c.codigo_ciudad 
        AND cp.codigo_estado = c.codigo_estado
      WHERE cp.codigo_estado = $1 AND cp.codigo_ciudad = $2`;
    
    const { rows } = await pool.query(queryText, [estado, ciudad]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
