const dotenv = require("dotenv");
const { configSchema } = require("./config.schema");

dotenv.config();
const config = {
  development: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
    JWT_VERIFICATION_KEY: process.env.JWT_VERIFICATION_KEY,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_PORT: Number(process.env.EMAIL_PORT),
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
    SERVER_HOST: process.env.SERVER_HOST,
  },
  production: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
    JWT_VERIFICATION_KEY: process.env.JWT_VERIFICATION_KEY,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_PORT: Number(process.env.EMAIL_PORT),
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
    SERVER_HOST: process.env.SERVER_HOST,
  },
  test: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    JWT_KEY: process.env.JWT_KEY,
    JWT_VERIFICATION_KEY: process.env.JWT_VERIFICATION_KEY,
    REDIS_URL: process.env.REDIS_URL,
    EMAIL_PORT: Number(process.env.EMAIL_PORT),
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_VERIFICATION_URL: process.env.EMAIL_VERIFICATION_URL,
    SERVER_HOST: process.env.SERVER_HOST,
  },
};

const checkEnvVariables = () => {
  const { error } = configSchema.validate(getConfig());
  if (error?.details?.[0].message) {
    throw new Error(error?.details?.[0].message);
  }

  if (error) {
    throw new Error("Invalid environment variables");
  }
};

const getConfig = () => {
  return config[process.env.NODE_ENV];
};

module.exports = {
  getConfig,
  checkEnvVariables,
};
