import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import validator from "validator";

const userSchema = new Schema({
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

userSchema.method("createHash", function (password) {
  // Create dynamic salt
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
});

// Note: According to Mongoose documentation, the first argument
// should be the singular name of your database collection.
// The third argument is optional, which specifies the collection
// name. If no collection is specified, then Mongoose will
// automatically look for the plural lowercase version of the model
// name.
const User = mongoose.model("User", userSchema, "users");
export default UserModel;
