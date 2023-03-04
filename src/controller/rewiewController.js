const reviewModel = require("../model/Review");
const productModel = require("../model/Product");
const { checkPermissions } = require("../../utils");

const createReview = async (req, res) => {
  try {
    const { product: productId } = req.body;
    const isValidProduct = await productModel({ _id: productId });
    if (!isValidProduct) {
      res.status(404).json({ msg: "product does not exist" });
    }

    const alreadySubmitted = await reviewModel.findOne({
      product: productId,
      _id: req.user.id,
    });
    if (alreadySubmitted) {
      res
        .status(400)
        .json({ msg: "Already submitted reviews for this product" });
    }
    req.body.user = req.user.id;
    const review = await reviewModel.create(req.body);
    res.status(200).json({ review });
  } catch (err) {
    console.log(err);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({}).populate({
        path:'product',
        select:'namee company price'
    });
    res.status(200).json({ reviews, count: reviews.length });
  } catch (err) {
    console.log(err);
  }
};

const getASingleReview = async (req, res) => {
  try {
    // res.send('get a single reviews')
    const id = req.params.id;
    const review = await reviewModel.findOne({ _id: id });
    if (!review) {
      return res.status(404).json({ msg: "no review with this id exist" });
    }
    res.status(200).json({ review });
  } catch (err) {
    console.log(err);
  }
};

//debug
const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const {title,rating,comment} = req.body
    const review = await reviewModel.findOne({ _id: id });
    if (!review) {
      return res
        .status(404)
        .json({ msg: "review with this id does not exist" });
    }
    checkPermissions(req.user,review.user)
    review.rating = rating;
    review.title = title;
    review.comment = comment;
  } catch (err) {}
};

//debug
const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewModel.findOne({ _id: id });
    // console.log(review,"ali");
    if (!review) {
      res.status(404).json({ msg: "reviw with this id does not exist" });
    }

    checkPermissions(req.user, review.user);
    await review.remove();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createReview,
  getASingleReview,
  getAllReviews,
  deleteReview,
  updateReview,
};
