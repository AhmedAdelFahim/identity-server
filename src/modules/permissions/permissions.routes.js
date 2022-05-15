/* eslint-disable new-cap */

const express = require("express");
const { validateRequest } = require("../../middlewares/validator.middleware");
const PermissionsController = require("./permissions.controller");
const PermissionsSchema = require("./permissions.schema");

const permissionRouter = express.Router();

permissionRouter.post(
    "/create",
    validateRequest({ body: PermissionsSchema.createPermission }),
    PermissionsController.createPermission,
);

permissionRouter.delete(
    "/remove/:id",
    PermissionsController.removePermission,
);

module.exports = permissionRouter;
