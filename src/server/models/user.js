import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import validator from "validator";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (val) => validator.isEmail(val),
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Date,
    required: true,
    default: new Date(),
  },
  orderHistory: {
    type: Array,
    default: [],
  },
  seller: {
    type: String,
    default: "",
  },
});

userSchema.methods.createHash = function (password) {
  // Create dynamic salt
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(
      password,
      this.salt + process.env.STATIC_SALT,
      10000,
      512,
      "sha512"
    )
    .toString("hex");
};

userSchema.statics.validatePassword = function (hash, salt, password) {
  return (
    hash ===
    crypto
      .pbkdf2Sync(password, salt + process.env.DB_SALT, 10000, 512, "sha512")
      .toString("hex")
  );
};

// Note: According to Mongoose documentation, the first argument
// should be the singular name of your database collection.
// The third argument is optional, which specifies the collection
// name. If no collection is specified, then Mongoose will
// automatically look for the plural lowercase version of the model
// name.
const User = mongoose.model("User", userSchema, "users");
export default User;
