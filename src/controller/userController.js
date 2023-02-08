const User = require("../model/User");
const { checkPermissions } = require("../../utils/index");

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
  checkPermissions(req.user, user._id);
  res.status(200).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ msg: "bad request" });
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    { email, password },
    { new: true, runValidators: true }
  );

  const tokenUser = {
    name: user.name,
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(200).json({ user: tokenUser });
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
  user.password = newPassword;

  await user.save();
  res.status(200).json({ msg: "Success,password updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
