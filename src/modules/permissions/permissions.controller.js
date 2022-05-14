const Logger = require("../../middlewares/logger.middleware");
const Permissions = require("./permissions.model");

const createPermission = async (req, res, next) => {
  try {
    await Permissions.create(req.body);
    Logger.log("debug", `Permission is created`);
    res.status(201).send({ message: `Permission is created` });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createPermission,
};
