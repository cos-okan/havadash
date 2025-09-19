import { ERROR_CODES, ERROR_STATUS, ERROR_MESSAGES } from "@havadash/utils";

const responseMiddleware = (req, res, next) => {
  if (!res.payload) {
    return next();
  }

  const {
    status = ERROR_CODES.INTERNAL_SERVER_ERROR,
    statusCode = ERROR_STATUS.INTERNAL_SERVER_ERROR,
    message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    data = null,
    meta = null,
  } = res.payload;

  return res.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
    meta,
  });
};

export default responseMiddleware;