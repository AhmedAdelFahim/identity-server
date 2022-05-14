/* eslint-disable require-jsdoc */
function validateRequest(schema) {
  return async (req, res, next) => {
    try {
      if (schema.headers) {
        await schema.headers.validateAsync(req.headers);
      }
      if (schema.query) {
        await schema.query.validateAsync(req.query);
      }
      if (schema.params) {
        await schema.params.validateAsync(req.params);
      }
      if (schema.body) {
        await schema.body.validateAsync(req.body);
      }
      next();
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = {
  validateRequest,
};
