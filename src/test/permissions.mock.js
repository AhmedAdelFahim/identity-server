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

const PermissionToBeRemoved = {
  _id: "6207a63a19fabbe6b7cacccc",
  action: "manage",
  resource: "products",
  userId: VerifiedUser._id,
};

async function initializePermissionsForTesting() {
  await Permissions.create(InsertedPermission);
  await Permissions.create(PermissionToBeRemoved);
}

async function getPermission(_id) {
  return Permissions.findOne({_id});
}


module.exports = {
  ValidPermission,
  InsertedPermission,
  PermissionToBeRemoved,
  initializePermissionsForTesting,
  getPermission,
};
