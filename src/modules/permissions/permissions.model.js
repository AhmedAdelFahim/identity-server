/* eslint-disable no-invalid-this */
const { model, Schema } = require("mongoose");
const User = require("../users/users.model");
const PermissionsSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      action: { type: String, required: true, trim: true },
      resource: { type: String, required: true, trim: true },
    },
    { timestamps: true },
);

PermissionsSchema.pre("save", async function(next) {
  const permission = this;
  const user = await User.exists({_id: permission.userId});
  if (!user) {
    const error = new Error("user not found");
    error.code = 404;
    throw error;
  }
  next();
});

PermissionsSchema.post("save", function(error, doc, next) {
  if (error) {
    error.modelName = "Permission";
    next(error);
  } else {
    next();
  }
});

PermissionsSchema.static(
    "checkPermissions",
    async function checkPermissions(filters) {
      const permission = await this.findOne(filters);
      if (!permission) {
        const error = new Error("user doesn't have permission");
        error.code = 401;
        throw error;
      }
      return permission;
    },
);

PermissionsSchema.index(
    { userId: 1, action: 1, resource: 1 },
    { unique: true },
);


const Permissions = model("Permission", PermissionsSchema);
module.exports = Permissions;
