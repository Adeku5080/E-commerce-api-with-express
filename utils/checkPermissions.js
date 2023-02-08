const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser)
  // console.log(resourceUserId)
  // console.log(typeof requestUser)
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  return res.status(401).json({msg : 'unauthorized'})
};

module.exports = checkPermissions;
