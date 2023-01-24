userModel = require("../model/User");

const getAllUsers = async (req, res) => {
  res.send("get all users");
};

const getSingleUser = async (req, res) => {
  res.send("get a users");
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
};

const updateUser = async (req, res) => {
  res.send("update a user");
};

const updateUserPassword = async (req, res) => {
    res.send("update a user");
  };
  


module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
};
