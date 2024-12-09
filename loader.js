/**
 * archivo: loader.js
 * descripción: Configuración de alias de importación
 * 
 * Resuelve los alias de los módulos. (../, ../../, ../../../, etc. -> @, @config, @utils, etc.)
 * Importar con alias. [ej: import { log } from '@logger' (especifico) :: import config from '@config/config.js' (general)]
*/

import { URL, pathToFileURL } from 'url';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const aliases = {
  '@': pathResolve(__dirname, 'src'),
  '@config': pathResolve(__dirname, 'src/config'),
  '@utils': pathResolve(__dirname, 'src/utils'),
  '@services': pathResolve(__dirname, 'src/services'),
  '@controllers': pathResolve(__dirname, 'src/controllers'),
  '@routes': pathResolve(__dirname, 'src/routes'),
  '@middlewares': pathResolve(__dirname, 'src/middlewares'),
  '@mail': pathResolve(__dirname, 'src/services/mail'),
  '@logger': pathResolve(__dirname, 'src/utils/logger.js'),
  '@constants': pathResolve(__dirname, 'src/utils/constants.js')

};

export function resolve(specifier, context, nextResolve) {
  for (const [alias, path] of Object.entries(aliases)) {
    if (specifier.startsWith(alias)) {
      const relativePath = specifier.slice(alias.length);
      const fullPath = pathResolve(path, relativePath.startsWith('/') ? relativePath.slice(1) : relativePath);
      return nextResolve(pathToFileURL(fullPath).href);
    }
  }
  return nextResolve(specifier);
}

export function load(url, context, nextLoad) {
  return nextLoad(url, context);
} 