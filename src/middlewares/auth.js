const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { isTokenValid } = require("../../utils/index");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Authentication failed" });
  }
  console.log(process.env.JWT_SECRET);

  try {
    const { name, id, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name, id, role };
    next();
  } catch (err) {
    console.log(err);
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ msg: "unauthorized" });
    }
    next();

  };

};


module.exports = { authenticateUser, authorizePermissions };
