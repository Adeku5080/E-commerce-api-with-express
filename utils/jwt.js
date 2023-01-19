const jwt = require("jsonwebtoken");


const createJwt = (payload) => {
    console.log("ali")
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createJwt,
  isTokenValid,
};
