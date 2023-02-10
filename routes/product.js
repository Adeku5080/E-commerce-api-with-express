const express = require("express");
const {
  authorizePermissions,
  auhthenticateUsers,
  authenticateUser,
} = require("../src/middlewares/auth");
const {
  getSingleProduct,
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
} = require("../src/controller/productController");
const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);
productRouter
  .route("/")
  .post([authenticateUser, authorizePermissions], createProduct);
productRouter
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions], deleteProduct)
  .patch([authenticateUser, authorizePermissions], updateProduct);

productRouter
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions], uploadImage);

module.exports = productRouter;
