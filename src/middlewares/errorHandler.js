const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.message == "unauthorized") {
    return res.status(401).json({
      msg: err.message,
    });
  }
};

module.exports = errorHandlerMiddleware;
