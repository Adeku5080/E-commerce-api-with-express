const express = require("express");
const { authenticateUser ,authorizePermissions} = require("../src/middlewares/auth");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../src/controller/userController");

userRouter = express.Router();

userRouter.route("/").get(authenticateUser,authorizePermissions('admin'),getAllUsers);
userRouter.route("/updateUser").post(authenticateUser,updateUser);
userRouter.route("/updateUserPassword").post(authenticateUser,updateUserPassword);
userRouter.route("/:id").get(authenticateUser,getSingleUser);
userRouter.route("/showMe").get(authenticateUser,showCurrentUser);

module.exports = userRouter;
