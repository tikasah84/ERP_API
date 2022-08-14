const express = require("express");
const defaultController = require("../controllers/defaultController");
const categoryValidation = require("../controllers/stock/stock.validator");
const { addCategory } = require("../controllers/stock/stock.controller");

const router = express.Router();

router.get("/", defaultController);
router.post("/addcategory", categoryValidation, addCategory);

module.exports = router;
