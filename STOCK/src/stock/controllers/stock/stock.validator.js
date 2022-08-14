const joi = require("joi");
const errorFunction = require("../../../utils/errorFunction");

const validation = joi.object({
  categoryName: joi.string().alphanum().min(3).max(25).trim(true).required(),
});

const categoryValidation = async (req, res, next) => {
  const payload = {
    categoryName: req.body.categoryName,
  };

  const { error } = validation.validate(payload);
  if (error) {
    res.status(400);
    return res.json(errorFunction(true, "Error Validating Category"));
  } else {
    next();
  }
};

module.exports = categoryValidation;
