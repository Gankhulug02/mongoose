const express = require("express");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
} = require("../controller/user");
const { checkLogin, authorization } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router
  .route("/")
  .post(checkLogin, createUser)
  .get(checkLogin, authorization("User"), getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
