const { getConfig } = require("../../config/config");
const Logger = require("../../middlewares/logger.middleware");
const { generateJWT, verifyJWT } = require("../../utils/jwt-helper");
const Redis = require("../../utils/redis");
const User = require("./users.model");
const {
  sendVerificationMail,
  prepareAccessTokenPayload,
} = require("./users.service");

const login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.checkCredential(email, password);
    const payload = prepareAccessTokenPayload(user);
    const token = generateJWT(payload, getConfig().JWT_KEY, {
      expiresIn: "5m",
    });
    Logger.log("debug", "login successfully");
    res
        .status(200)
        .send({ message: "login successfully", data: { ...user, token } });
  } catch (e) {
    return next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const { user } = req;
    await Redis.set(user.jti, user.userId);
    await Redis.expireAt(user.jti, user.exp);
    Logger.log("debug", "logout successfully");
    res.status(200).send({ message: "logout successfully" });
  } catch (e) {
    return next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    sendVerificationMail(user.email);
    Logger.log("debug", `User is created ${user.username}`);
    res.status(201).send({ message: `User is created ${user.username}` });
  } catch (e) {
    return next(e);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const {
      params: { token },
    } = req;
    const payload = await verifyJWT(token, getConfig().JWT_VERIFICATION_KEY);
    await User.verifyAccount(payload.email);
    Logger.log("debug", "Account is verified successfully");
    res.status(200).send({ message: "account is verified successfully" });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  login,
  createUser,
  verifyAccount,
  logout,
};
