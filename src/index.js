const app = require("./app");
const { getConfig, checkEnvVariables } = require("./config/config");
const { startDbConnection } = require("./config/db-connection");
const Logger = require("./middlewares/logger.middleware");
const Redis = require("./utils/redis");

const start = async () => {
  checkEnvVariables();
  await startDbConnection();
  await Redis.initializeRedis();
  app.listen(getConfig().PORT, () =>
    Logger.log("info", `Listening on port ${getConfig().PORT}!`),
  );
};

start();
