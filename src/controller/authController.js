require("express-async-errors");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const createJwt = require("../../utils/index");
const isTokenValid = require("../../utils/index");
const attachCookeToResponse = require("../../utils/index");

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

  //make first registered user an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;

  userData.role = isFirstAccount ? "admin" : "user";

  const user = await User.create(userData);

  const tokenUser = {
    name: user.name,
    id: user._id,
    role: user.role,
  };
  const token = jwt.sign(tokenUser, "process.env.JWT_SECRET", {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "email and password is required",
    });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ msg: "unauthorized" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "unAuthenticated" });
  }

  const tokenUser = {
    name: user.name,
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(tokenUser, "process.env.JWT_SECRET", {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(201).json({ user: tokenUser });
};

const logout = async (req,res) => {
  res.cookie("token",'logout',{
    httpOnly:true,
    expires:new Date(Date.now())
  })

  res.status(200).json({msg : "logout succesful"})
};

module.exports = { login, register, logout };
