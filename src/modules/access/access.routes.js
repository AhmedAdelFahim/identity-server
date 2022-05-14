/* eslint-disable new-cap */

const express = require("express");
const { auth } = require("../../middlewares/auth.middleware");
const { validateRequest } = require("../../middlewares/validator.middleware");
const AccessController = require("./access.controller");
const AccessSchema = require("./access.schema");

const accessRouter = express.Router();

accessRouter.post(
    "/check",
    validateRequest({ body: AccessSchema.checkAccess }),
    auth,
    AccessController.checkAccess,
);

module.exports = accessRouter;
