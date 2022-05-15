/* eslint-disable require-jsdoc */
const Permissions = require("../modules/permissions/permissions.model");
const { VerifiedUser } = require("./users.mock");

const ValidPermission = {
  action: "delete",
  resource: "products",
  userId: VerifiedUser._id,
};

const InsertedPermission = {
  _id: "6207a63a19fabbe6b6cacccc",
  action: "create",
  resource: "products",
  userId: VerifiedUser._id,
};

async function initializePermissionsForTesting() {
  await Permissions.create(InsertedPermission);
}

module.exports = {
  ValidPermission,
  InsertedPermission,
  initializePermissionsForTesting,
};
