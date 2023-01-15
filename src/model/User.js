const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 5,
    maxlength: 60,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an E-mail"],
    validate: {
      validator: validator.isEmail,
      message: "Provide a valid Email",
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

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}
module.exports = mongoose.model("User", UserSchema);
