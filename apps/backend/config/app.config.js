import "dotenv/config";

const config = {
  COMMON: {
    nodeEnv: process.env.NODE_ENV || "development",
    database: {
      type: process.env.DB_TYPE || "postgres",
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || "5432",
    },
    jwtConf: {
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  },

  SERVICE: {
    port: process.env.PORT || 3000,
    name: process.env.SERVICE_NAME || "havadash-backend-service",
    endpoint_prefix: `/api`,
  },

  DATABASE: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  INFRA: {
    postgres: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    redis: {
      url: process.env.REDIS_URL,
    },
  },
};

export default config;