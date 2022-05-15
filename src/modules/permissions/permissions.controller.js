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

const removePermission = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const deletedPermission = await Permissions.findOneAndDelete({ _id: id });

    if (!deletedPermission) {
      const error = new Error("Permission not found");
      error.code = 404;
      throw error;
    }

    Logger.log("debug", `Permission is deleted`);
    res.status(200).send({ message: `Permission is deleted` });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  createPermission,
  removePermission,
};
