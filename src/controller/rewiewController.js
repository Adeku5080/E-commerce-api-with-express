const reviewModel = require("../model/Review");

const createReview = async (req, res) => {
  try {
    res.send("createreview");
  } catch (err) {}
};

const getAllReviews = async (req, res) => {
  try {
    res.send("getallreviews");
  } catch (err) {}
};

const getASingleReview = async (req, res) => {
  try {
  } catch (err) {}
};

const updateReview = async (req, res) => {
  try {
  } catch (err) {}
};

const deleteReview = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  createReview,
  getASingleReview,
  getAllReviews,
  deleteReview,
  updateReview,
};
