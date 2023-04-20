const express = require("express");
const orderRouter = express.Router();
const {
  authorizePermissions,
  authenticateUser,
} = require("../src/middlewares/auth");

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../src/controller/orderController");

orderRouter
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders)
  .post(authenticateUser, createOrder);
orderRouter
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);
orderRouter.route("/showallmyorders").get(getCurrentUserOrders);

module.exports = orderRouter;
