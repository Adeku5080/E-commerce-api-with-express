// fix check permissions,throwing custom error
const checkPermissions = (requestUser, resourceUserId) => {

  if (requestUser.role === "admin") return;
  if (requestUser.id === resourceUserId.toString()) return;
  console.log('unauthorized,you cannot perform this request')
};

module.exports = checkPermissions;
 