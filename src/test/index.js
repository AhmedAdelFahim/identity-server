/* eslint-disable require-jsdoc */
// import {startDbConnection} from '../../config/db-connection';
// import JobScheduler from '../utils/job-scheduler/job-scheduler';
// import {checkURL} from '../modules/url/url.service';
// import {Redis} from '../utils/redis';
// import mongoose from 'mongoose';
// import {initializeUsersForTesting} from './user-helper';
// import {initializeURLForTesting} from './url-helper';
// import {initializeLogsForTesting} from './report-helper';
const Redis = require("../utils/redis");
const { startDbConnection } = require("../config/db-connection");
const { default: mongoose } = require("mongoose");
const { initializeUsersForTesting } = require("./users.mock");

async function initialize() {
  await startDbConnection();
  await Redis.initializeRedis();
  await mongoose.connection.dropDatabase();
  await initializeUsersForTesting();
}

async function teardown() {
  await mongoose.connection.close();
  await Redis.closeConnection();
}

module.exports = {
  teardown,
  initialize,
};
