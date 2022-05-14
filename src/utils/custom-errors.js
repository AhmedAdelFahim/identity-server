const Logger = require("../middlewares/logger.middleware");

/* eslint-disable require-jsdoc */
class CustomErrors extends Error {
  code;
  message;

  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}

const errorMapping = (error) => {
  Logger.log("error", JSON.stringify(error));
  let message = "Internal Server Error";
  let code = 500;
  const handledCodes = [400, 401, 404];
  if (error?.code) {
    if (error?.name === "MongoServerError" && error?.code === 11000) {
      message = error.message;
      if (error?.modelName) {
        message = `${error.modelName} already exist`;
      }
      code = 400;
    } else if (handledCodes.includes(error?.code)) {
      message = error.message;
      code = error.code;
    }
  } else if (error.isJoi && error.details?.[0]?.message) {
    message = error.details?.[0]?.message;
    code = 400;
  }

  return new CustomErrors(message, code);
};

module.exports = {
  CustomErrors,
  errorMapping,
};
