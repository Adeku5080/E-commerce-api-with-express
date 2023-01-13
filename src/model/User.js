const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength :5,
    maxlength :60
  },
  email: {
    type: String,
    required: [true, "please provide an E-mail"],
    validate:{
        validator : validator.isEmail,
        message : "Provide a valid Email"
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
