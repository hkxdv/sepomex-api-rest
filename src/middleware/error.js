import { errorResponse } from "@utils/responses.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json(errorResponse(err.message || "Error interno del servidor"));
};
