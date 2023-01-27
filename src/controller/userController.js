const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({_id:id }).select("-password");

  if (!user) {
    return res.status(404);
  }

  res.status(200).json({ user });
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
  updateUserPassword,
};
