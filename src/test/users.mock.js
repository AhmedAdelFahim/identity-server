/* eslint-disable require-jsdoc */
const { getConfig } = require("../config/config");
const User = require("../modules/users/users.model");
const { prepareAccessTokenPayload } = require("../modules/users/users.service");
const { generateJWT } = require("../utils/jwt-helper");

const ValidUser = {
  email: "reluttr@grecc.me",
  username: "reluttr",
  password: "P@ssw0rd",
};

const VerifiedUser = {
  _id: "6207a63a19fabbe6b9cacccc",
  email: "lenadzyubanova@sirkelmail.com",
  username: "lenadzyubanova",
  password: "P@ssw0rd",
  isVerified: true,
};


const NotVerifiedUser = {
  _id: "62066c4ca352a5a5edb71a93",
  email: "najadi4089@petloca.com",
  username: "najadi4089",
  password: "123456",
  isVerified: false,
};

const VerifiedUserToken = generateJWT(
    prepareAccessTokenPayload(VerifiedUser),
    getConfig().JWT_KEY,
);


async function initializeUsersForTesting() {
  await User.create(VerifiedUser);
  await User.create(NotVerifiedUser);
}

module.exports = {
  initializeUsersForTesting,
  VerifiedUserToken,
  ValidUser,
  VerifiedUser,
  NotVerifiedUser,
};
