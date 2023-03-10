const express = require("express");
const { register, login ,logout} = require("../src/controller/authController");
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", logout);

module.exports = authRouter;
