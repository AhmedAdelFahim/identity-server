const morgan = require("morgan");
const Logger = require("./logger.middleware");

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream = {
  // Use the http severity
  write: (message) =>
    Logger.http(message.substring(0, message.lastIndexOf("\n"))),
};

// Build the morgan middleware
const morganMiddleware = morgan(":method :url :response-time ms", { stream });
module.exports = morganMiddleware;
