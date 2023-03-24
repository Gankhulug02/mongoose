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
const checkRole = require("../utils/checkRole");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").post(checkRole, createUser).get(checkRole, getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
