const errorFunction = require("../../utils/errorFunction");

const defaultController = async (req, res, next) => {
  console.log("hello");
  res.status(200);
  res.json(errorFunction(false, "Home Page", "Welcome from ERP Api"));
};

module.exports = defaultController;
