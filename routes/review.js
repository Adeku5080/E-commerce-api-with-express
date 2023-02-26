const express = require("express");
const reviewRouter = express.Router();
const {
  createReview,
  getASingleReview,
  getAllReviews,
  deleteReview,
  updateReview,
} = require("../src/controller/rewiewController");

reviewRouter.route("/").get(getAllReviews).post(createReview);
reviewRouter
  .route("/:id")
  .get(getASingleReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = reviewRouter;
