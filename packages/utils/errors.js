import { ERROR_MESSAGES, ERROR_STATUS, ERROR_CODES, RESPONSE_STATUS } from "./constants.js"

class BaseError extends Error {
    constructor(
        message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        statusCode = ERROR_STATUS.INTERNAL_SERVER_ERROR,
        name = ERROR_CODES.INTERNAL_SERVER_ERROR,
        isOperational = true,
        errors = null,
        code = name
    ) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errors = errors;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            status: RESPONSE_STATUS.ERROR,
            name: this.name,
            code: this.code,
            message: this.message,
            ...(this.errors && { errors: this.errors }),
        };
    }
}

class HttpError extends BaseError {
    constructor(
        message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        statusCode = ERROR_STATUS.INTERNAL_SERVER_ERROR,
        name = ERROR_CODES.INTERNAL_SERVER_ERROR,
        isOperational = true,
        errors = null,
        code = name
    ) {
        super(message, statusCode, name, isOperational, errors, code);
        this.isHttpError = true;
    }
}

class ConflictError extends HttpError {
    constructor(
        message = ERROR_MESSAGES.CONFLICT,
        name = ERROR_CODES.CONFLICT,
        errors = null
    ) {
        super(message, ERROR_STATUS.CONFLICT, name, true, errors);
    }
}


class NotFoundError extends HttpError {
    constructor(
        message = ERROR_MESSAGES.NOT_FOUND,
        name = ERROR_CODES.NOT_FOUND,
        errors = null
    ) {
        super(message, ERROR_STATUS.NOT_FOUND, name, true, errors);
    }
}

class TokenNotFoundError extends BaseError {
    constructor(message = ERROR_MESSAGES.TOKEN_NOT_FOUND) {
        super(message, ERROR_STATUS.TOKEN_NOT_FOUND, ERROR_CODES.TOKEN_NOT_FOUND);
    }
}

class InvalidTokenError extends BaseError {
    constructor(message = ERROR_MESSAGES.INVALID_TOKEN) {
        super(message, ERROR_STATUS.INVALID_TOKEN, ERROR_CODES.INVALID_TOKEN);
    }
}

class ExpiredTokenError extends BaseError {
    constructor(message = ERROR_MESSAGES.EXPIRED_TOKEN) {
        super(message, ERROR_STATUS.EXPIRED_TOKEN, ERROR_CODES.EXPIRED_TOKEN);
    }
}

class UserNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.USER_NOT_FOUND, name = ERROR_CODES.USER_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.USER_NOT_FOUND, name, true, errors);
  }
}

class UserAlreadyExistError extends ConflictError {
  constructor(message = ERROR_MESSAGES.USER_ALREADY_EXIST, name = ERROR_CODES.USER_ALREADY_EXIST, errors = null) {
    super(message, ERROR_STATUS.USER_ALREADY_EXIST, name, true, errors);
  }
}

class CustomerNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.CUSTOMER_NOT_FOUND, name = ERROR_CODES.CUSTOMER_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.CUSTOMER_NOT_FOUND, name, true, errors);
  }
}

class CustomerAlreadyExistError extends ConflictError {
  constructor(message = ERROR_MESSAGES.CUSTOMER_ALREADY_EXIST, name = ERROR_CODES.CUSTOMER_ALREADY_EXIST, errors = null) {
    super(message, ERROR_STATUS.CUSTOMER_ALREADY_EXIST, name, true, errors);
  }
}

class DroneNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.DRONE_NOT_FOUND, name = ERROR_CODES.DRONE_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.DRONE_NOT_FOUND, name, true, errors);
  }
}

class DroneAlreadyExistError extends ConflictError {
  constructor(message = ERROR_MESSAGES.DRONE_ALREADY_EXIST, name = ERROR_CODES.DRONE_ALREADY_EXIST, errors = null) {
    super(message, ERROR_STATUS.DRONE_ALREADY_EXIST, name, true, errors);
  }
}

class OrderNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.ORDER_NOT_FOUND, name = ERROR_CODES.ORDER_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.ORDER_NOT_FOUND, name, true, errors);
  }
}

class OrderAlreadyExistError extends ConflictError {
  constructor(message = ERROR_MESSAGES.ORDER_ALREADY_EXIST, name = ERROR_CODES.ORDER_ALREADY_EXIST, errors = null) {
    super(message, ERROR_STATUS.ORDER_ALREADY_EXIST, name, true, errors);
  }
}

class CountryNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.COUNTRY_NOT_FOUND, name = ERROR_CODES.COUNTRY_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.COUNTRY_NOT_FOUND, name, true, errors);
  }
}

class CountryAlreadyExistError extends ConflictError {
  constructor(message = ERROR_MESSAGES.COUNTRY_ALREADY_EXIST, name = ERROR_CODES.COUNTRY_ALREADY_EXIST, errors = null) {
    super(message, ERROR_STATUS.COUNTRY_ALREADY_EXIST, name, true, errors);
  }
}

class CityNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.CITY_NOT_FOUND, name = ERROR_CODES.CITY_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.CITY_NOT_FOUND, name, true, errors);
  }
}

class CityAlreadyExistError extends ConflictError {
  constructor(message = ERROR_MESSAGES.CITY_ALREADY_EXIST, name = ERROR_CODES.CITY_ALREADY_EXIST, errors = null) {
    super(message, ERROR_STATUS.CITY_ALREADY_EXIST, name, true, errors);
  }
}

class AddressNotFoundError extends NotFoundError {
  constructor(message = ERROR_MESSAGES.ADDRESS_NOT_FOUND, name = ERROR_CODES.ADDRESS_NOT_FOUND, errors = null) {
    super(message, ERROR_STATUS.ADDRESS_NOT_FOUND, name, true, errors);
  }
}

export { 
  TokenNotFoundError,
  InvalidTokenError,
  ExpiredTokenError,
  UserNotFoundError,
  UserAlreadyExistError,
  CustomerNotFoundError,
  CustomerAlreadyExistError,
  DroneNotFoundError,
  DroneAlreadyExistError,
  OrderNotFoundError,
  OrderAlreadyExistError,
  CountryNotFoundError,
  CountryAlreadyExistError,
  CityNotFoundError,
  CityAlreadyExistError,
  AddressNotFoundError
};