const { Router } = require("express");
const express = require("express");
const { register, login } = requre("../src/controller/authController");
const authRouter = express.Router();

Router.post("/login", login);
Router.post("/register", register);
Router.post("/logout", logout);

module.exports = authRouter;
