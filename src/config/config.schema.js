const Joi = require("joi");

const configSchema = Joi.object({
  PORT: Joi.number().port().required(),
  NODE_ENV: Joi.string().valid("development", "test", "production").required(),
  DB_URL: Joi.string().required(),
  JWT_KEY: Joi.string().required(),
  JWT_VERIFICATION_KEY: Joi.string().required(),
  EMAIL_PORT: Joi.number().port().required(),
  EMAIL_HOST: Joi.string().required(),
  EMAIL_USERNAME: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_VERIFICATION_URL: Joi.string().required(),
  SERVER_HOST: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
});

module.exports = {
  configSchema,
};
