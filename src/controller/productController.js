const Product = require("../model/Product");

const createProduct = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (err) {
    console.log(err);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).json({ Products, count: Products.length });
  } catch (err) {
    console.log(err);
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = Product.findOne({ _id: id });
    if (!product) {
      res.status(404).json({ msg: "product does not exist" });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    Product.findOneAndDelete({ _id: id });
    res.status(204).json({ msg: "delered succesfully" });
  } catch (err) {
    console.log(err);
  }
};
const uploadImage = async (req, res) => {};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
