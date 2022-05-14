const { errorMapping } = require("../utils/custom-errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  const errors = errorMapping(err);
  res.status(errors.code).send(errors);
};

module.exports = {
  errorHandlerMiddleware,
};
