const notFound = (req, res,next) => {
  res.status(404).send("route does no exist");
};

module.exports = notFound