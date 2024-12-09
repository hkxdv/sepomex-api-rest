/**
 * archivo: db.utils.js
 * descripción: Funcion helper para ejecutar queries
 */

import { pool } from '@config/database.js';

export const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    throw err;
  }
};

