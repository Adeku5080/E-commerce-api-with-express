const mongoose = require("mongoose")

const connect = (URI) => {
  mongoose
    .connect(URI,{autoIndex : false})
    .then(() => console.log("connected to the DB"))
    .catch((err) => console.log(err));
};

module.exports = connect;
