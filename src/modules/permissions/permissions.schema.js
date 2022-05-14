const Joi = require("joi");

const createPermission = Joi.object({
  userId: Joi.string().required(),
  action: Joi.string().trim().required(),
  resource: Joi.string().trim().required(),
});

module.exports = {
  createPermission,
};
