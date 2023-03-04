const express = require("express");
const {
  authorizePermissions,
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
  .post([authenticateUser, authorizePermissions("admin")], createProduct);
productRouter
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);

productRouter
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

module.exports = productRouter;
