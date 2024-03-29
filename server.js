require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connect = require("./database/connect");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const reviewRouter = require("./routes/review");
const orderRouter = require("./routes/order");

const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

const PORT = 7000;

//database
connect(process.env.MONGO_URI);

app.get("/index", async (req, res, next) => {
  console.log("adeku");
  throw new Error("unauthorized");
});

//middlewares
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("ecommerce-api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFound);
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`you are listening on port ${PORT}`);
});
