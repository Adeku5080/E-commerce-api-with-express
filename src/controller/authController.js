
const User = require("../model/User")

const register= async(req,res)=>{
  res.send('register')
}

const login=async()=>{
  res.send('login')
}
const logout = async()=>{
   res.send('logout')
}

module.exports ={login,register,logout}