const express = require("express");
const reviewRouter = express.Router();
const {
  authorizePermissions,
  authenticateUser,
} = require("../src/middlewares/auth");
const {
  createReview,
  getASingleReview,
  getAllReviews,
  deleteReview,
  updateReview,
} = require("../src/controller/rewiewController");

reviewRouter.route("/").get(getAllReviews).post(authenticateUser, createReview);
reviewRouter
  .route("/:id")
  .get(getASingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = reviewRouter;
