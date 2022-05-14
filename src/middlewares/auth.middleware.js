const { getConfig } = require("../config/config");
const { verifyJWT } = require("../utils/jwt-helper");
const Redis = require("../utils/redis");

/* eslint-disable require-jsdoc */
async function auth(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      const error = new Error("No Token Provided");
      error.code = 400;
      throw error;
    }
    const decoded = await verifyJWT(
        token.split(" ")?.[1] || "",
        getConfig().JWT_KEY,
    );
    if (!decoded) {
      const error = new Error("Unauthorized");
      error.code = 401;
      throw error;
    }

    if (req?.route?.path !== "/logout") {
      const { jti } = decoded;
      const userId = await Redis.get(jti);
      if (!userId) {
        const error = new Error("Unauthorized");
        error.code = 401;
        throw error;
      }
    }
    req.user = decoded;
    next();
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  auth,
};
