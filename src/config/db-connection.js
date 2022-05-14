const { connect } = require("mongoose");
const Logger = require("../middlewares/logger.middleware");
const { getConfig } = require("./config");
const startDbConnection = async () => {
  try {
    await connect(getConfig().DB_URL, { authSource: "admin" });
    Logger.log(
        "info",
        "Connection to database has been established successfully.",
    );
  } catch (error) {
    Logger.log(
        "error",
        `Unable to connect to the database: ${JSON.stringify(error)}`,
    );
  }
};

module.exports = { startDbConnection };
