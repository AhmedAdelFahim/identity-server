/* eslint-disable require-jsdoc */
const Redis = require("../utils/redis");
const { startDbConnection } = require("../config/db-connection");
const { default: mongoose } = require("mongoose");
const { initializeUsersForTesting } = require("./users.mock");
const { initializePermissionsForTesting } = require("./permissions.mock");

async function initialize() {
  await startDbConnection();
  await Redis.initializeRedis();
  await mongoose.connection.dropDatabase();
  await initializeUsersForTesting();
  await initializePermissionsForTesting();
}

async function teardown() {
  await mongoose.connection.close();
  await Redis.closeConnection();
}

module.exports = {
  teardown,
  initialize,
};
