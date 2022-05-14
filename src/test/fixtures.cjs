const { initialize, teardown } = require("./index");

exports.mochaGlobalSetup = async function() {
  await initialize();
};

exports.mochaGlobalTeardown = async function() {
  await teardown();
};
