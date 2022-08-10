const express = require("express");
const addressValidation = require("../controllers/user/address.validator");
const {
  addAddress,
  getAddress,
} = require("../controllers/user/address.controller");

const router = express.Router();

router.get("/getAddress", getAddress);
router.post("/addAddress", addressValidation, addAddress);

module.exports = router;
