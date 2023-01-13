require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const connect = require("./database/connect");
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/index", async(req, res,next) => {
    console.log("adeku")
  throw new Error("unauthorized");
});

app.use(notFound)
app.use(errorHandler);
connect(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`you are listening on port ${PORT}`);
});
