require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const connect = require("./database/connect");
const authRouter = require("./routes/auth")
const notFound = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = 8000;


//database
connect(process.env.MONGO_URI);


app.get("/index", async(req, res,next) => {
    console.log("adeku")
  throw new Error("unauthorized");
});



//middlewares

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth",authRouter)

app.use(notFound)
app.use(errorHandler);

//server 
app.listen(PORT, () => {
  console.log(`you are listening on port ${PORT}`);
});
