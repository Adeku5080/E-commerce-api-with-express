require("express-async-errors");

const User = require("../model/User");

const register = async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res
      .status(401)
      .json({ msg: "A user with this email already exists" });
  }

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.create(userData);

  return res.status(200).json({ user });
};

const login = async () => {
  res.send("login");
};
const logout = async () => {
  res.send("logout");
};

module.exports = { login, register, logout };
