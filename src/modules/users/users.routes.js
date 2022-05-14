/* eslint-disable new-cap */

const express = require("express");
const { validateRequest } = require("../../middlewares/validator.middleware");
const { auth } = require("../../middlewares/auth.middleware");
const { createUser, login } = require("./users.schema");
const UserController = require("./users.controller");

const userRouter = express.Router();

userRouter.post(
    "/create",
    validateRequest({ body: createUser }),
    UserController.createUser,
);
userRouter.post(
    "/login",
    validateRequest({ body: login }),
    UserController.login,
);
userRouter.post(
    "/logout",
    auth,
    UserController.logout,
);
userRouter.get("/verify/:token", UserController.verifyAccount);

module.exports = userRouter;
