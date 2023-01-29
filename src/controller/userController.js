const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    return res.status(404);
  }

  res.status(200).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send("update a user");
};

const updateUserPassword = async (req, res) => {


  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  

  const id = req.user.id;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: "unauthenticated" });
  }

  const user = await User.findOne({ _id: id });

  const isPasswordCorrect = user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "invalid credentials" });
  }
  user.password = newPassword

  await user.save()
  res.status(200).json({msg : "Success,password updated"})
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
