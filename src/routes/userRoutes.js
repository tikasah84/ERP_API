const express = require("express");
const userValidation = require("../controllers/user/user.validator");
const {
  addUser,
  getUsers,
  login,
} = require("../controllers/user/user.controller");
const defaultController = require("../controllers/defaultController");

const router = express.Router();

router.get("/", defaultController);

router.post("/addUser", userValidation, addUser);

router.get("/getUsers", getUsers);
router.get("/login", login);

module.exports = router;
