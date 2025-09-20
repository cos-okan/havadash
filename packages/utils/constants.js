const EXCLUDED_URLS = [
  "/api/auth/register",
  "/api/auth/login",
  "/api/auth/set-password",
  "/api/auth/refresh-token",
  "/api/auth/logout",
];

const RESPONSE_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const HEADERS = {
    AUTHORIZATION: 'authorization',
    RETRYCOUNT: "x-retry-count",
    CONTENT_TYPE: 'Content-Type',
    CONTENT_DISPOSITION: 'Content-Disposition',
};

const HTTP_STATUS = {
    // 200
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHOTITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    // 400
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    // 500
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
};

const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST: 'BAD_REQUEST',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    TOKEN_NOT_FOUND: 'TOKEN_NOT_FOUND',
    INVALID_TOKEN: 'INVALID_TOKEN',
    EXPIRED_TOKEN: 'EXPIRED_TOKEN',
    USER_NOT_FOUND: 'USER_NOT_FOUND_ERROR',
    USER_ALREADY_EXIST: 'USER_ALREADY_EXIST_ERROR',
    CUSTOMER_NOT_FOUND: 'CUSTOMER_NOT_FOUND_ERROR',
    CUSTOMER_ALREADY_EXIST: 'CUSTOMER_ALREADY_EXIST_ERROR',
};

const ERROR_MESSAGES = {
    VALIDATION_ERROR: 'Geçersiz veri gönderildi.',
    UNAUTHORIZED: 'Yetkisiz erişim.',
    FORBIDDEN: 'Bu işlemi yapma yetkiniz yok.',
    NOT_FOUND: 'İstenen kaynak bulunamadı.',
    CONFLICT: 'Zaten mevcut bir kayıt var.',
    INTERNAL_SERVER_ERROR: 'Sunucuda beklenmeyen bir hata oluştu.',
    BAD_REQUEST: 'İstek geçersiz.',
    TOO_MANY_REQUESTS: 'Çok fazla istek yapıldı. Lütfen sonra tekrar deneyin.',
    SERVICE_UNAVAILABLE: 'Servis geçici olarak kullanılamıyor.',
    TOKEN_NOT_FOUND: '[Auth] Authorization header içinde token bulunamadı.',
    INVALID_TOKEN: '[Auth] Token geçersiz.',
    EXPIRED_TOKEN: '[Auth] Token süresi dolmuş.',
    USER_ALREADY_EXIST: 'Kullanıcı zaten mevcut.',
    USER_NOT_FOUND: 'Kullanıcı bulunamadı.',
    CUSTOMER_ALREADY_EXIST: 'Müşteri zaten tanımlı',
    CUSTOMER_NOT_FOUND: 'Müşteri bulunamadı.',
};

const ERROR_STATUS = {
    VALIDATION_ERROR: 400,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    TOKEN_NOT_FOUND: 401,
    INVALID_TOKEN: 403,
    EXPIRED_TOKEN: 401,
    USER_NOT_FOUND: 404,
    USER_ALREADY_EXIST: 409,
    CUSTOMER_NOT_FOUND: 404,
    CUSTOMER_ALREADY_EXIST: 409,
};

const MESSAGES = {
    USER_LOGIN_SUCCESS: 'Başarıyla giriş yapıldı.',
    LOGOUT_SUCCESS: 'Oturum sonlandırıldı.',
    USER_FETCHED_SUCCESS: 'Kullanıcı başarıyla getirildi.',
    USERS_FETCHED_SUCCESS: 'Kullanıcılar başarıyla getirildi.',
    USER_CREATED_SUCCESS: 'Kullanıcı başarıyla oluşturuldu.',
    USER_UPDATED_SUCCESS: 'Kullanıcı başarıyla güncellendi.',
    USER_DELETED_SUCCESS: 'Kullanıcı başarıyla silindi.',
    CUSTOMER_FETCHED_SUCCESS: 'Müşteri başarıyla getirildi.',
    CUSTOMERS_FETCHED_SUCCESS: 'Müşteriler başarıyla getirildi.',
    CUSTOMER_CREATED_SUCCESS: 'Müşteri başarıyla oluşturuldu.',
    CUSTOMER_UPDATED_SUCCESS: 'Müşteri başarıyla güncellendi.',
    CUSTOMER_DELETED_SUCCESS: 'Müşteri başarıyla silindi.',
};


export { 
  EXCLUDED_URLS,
  RESPONSE_STATUS,
  HEADERS,
  HTTP_STATUS,
  ERROR_CODES,
  ERROR_MESSAGES,
  ERROR_STATUS,
  MESSAGES
};