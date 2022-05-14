/* eslint-disable new-cap */
const express = require("express");
const accessRouter = require("../../modules/access/access.routes");
const permissionRouter =
    require("../../modules/permissions/permissions.routes");
const userRouter = require("../../modules/users/users.routes");

const apiRouter = express.Router();

apiRouter.use("/v1/users", userRouter);
apiRouter.use("/v1/permissions", permissionRouter);
apiRouter.use("/v1/access", accessRouter);

module.exports = apiRouter;
