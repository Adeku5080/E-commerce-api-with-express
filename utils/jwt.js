const jwt = require("jsonwebtoken");


const createJwt = (payload) => {
    console.log("ali")
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// const oneDay = 1000 * 60 * 60 * 24

// const attachCookeToResponse =(token)=>{
//   res.cookie9('token',token,{
//     htppOnly:true,
//     expires : new Date(Date.now() + oneDay)
//   })
// }

module.exports = {
  createJwt,
  isTokenValid,
};
