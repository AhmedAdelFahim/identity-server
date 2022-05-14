const Joi = require("joi");

const checkAccess = Joi.object({
  action: Joi.string().trim().required(),
  resource: Joi.string().trim().required(),
});

module.exports = {
  checkAccess,
};
