import { RESPONSE_STATUS, ERROR_STATUS, ERROR_MESSAGES } from "@havadash/utils";

const errorMiddleware = async (err, req, res, next) => {
  if (err?.response) {
    const { data, status } = err.response;

    res.payload = {
      status: RESPONSE_STATUS.ERROR,
      statusCode: status || ERROR_STATUS.INTERNAL_SERVER_ERROR,
      message:
        data?.error_description ||
        data?.message ||
        data?.errorMessage ||
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      data: null,
    };
    return next();
  }

  if (err instanceof Error) {
    res.payload = {
      status: RESPONSE_STATUS.ERROR,
      statusCode:
        err.status ||
        err.statusCode ||
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      data: null,
    };
    return next();
  }

  res.payload = {
    status: RESPONSE_STATUS.ERROR,
    statusCode: ERROR_STATUS.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    data: null,
  };
  next();
};

export default errorMiddleware;