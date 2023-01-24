const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
} = require("../src/controller/userController");

userRouter = express.Router()

userRouter.route("/").get(getAllUsers)
userRouter.route("./updateUser").post(updateUser)
userRouter.route("./updateUserPassword").post(updateUserPassword)
userRouter.route("/:id").get(getSingleUser)
userRouter.route("/showMe").get(showCurrentUser)
module.exports=userRouter