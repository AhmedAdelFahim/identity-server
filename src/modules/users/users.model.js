/* eslint-disable no-invalid-this */
const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isVerified: { type: Boolean, optional: true, default: false },
    },
    { timestamps: true },
);

UserSchema.pre("save", async function(next) {
  const user = this;
  const saltRounds = 8;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

UserSchema.post("save", function(error, doc, next) {
  if (error) {
    error.modelName = "User";
    next(error);
  } else {
    next();
  }
});

UserSchema.method("toJSON", function toJSON() {
  const user = this;
  return {
    email: user.email,
    userId: user._id,
    isVerified: user.isVerified,
  };
});

UserSchema.static(
    "checkCredential",
    async function checkCredential(email, password) {
      const user = await this.findOne({ email });
      const error = new Error("email or password is incorrect");
      error.code = 400;
      if (!user) {
        throw error;
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw error;
      }
      if (!user.isVerified) {
        const error = new Error("email is not verified");
        error.code = 400;
        throw error;
      }
      return user.toJSON();
    },
);

UserSchema.static("verifyAccount", async function verifyAccount(email) {
  const user = await this.findOne({ email });
  const error = new Error("this account doesn't exist");
  error.code = 404;
  if (!user) {
    throw error;
  }
  user.isVerified = true;
  await user.save();
  return user;
});

UserSchema.static("findByEmail", async function findByEmail(email) {
  const user = await this.findOne({ email });
  const error = new Error("this account doesn't exist");
  error.code = 404;
  if (!user) {
    throw error;
  }
  return user;
});

const User = model("User", UserSchema);
module.exports = User;
