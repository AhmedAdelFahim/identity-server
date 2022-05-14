const Logger = require("../../middlewares/logger.middleware");
const Permissions = require("../permissions/permissions.model");

const checkAccess = async (req, res, next) => {
  const {
    body: { action, resource },
    tokenPayload: { userId },
  } = req;
  try {
    await Permissions.checkPermissions({ action, resource, userId });
    Logger.log("debug", `user has access`);
    res
        .status(200)
        .send({ message: `User has access to ${action} on ${resource}` });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  checkAccess,
};
