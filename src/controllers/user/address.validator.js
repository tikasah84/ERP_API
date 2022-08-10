const joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

const validation = joi.object({
  city: joi.string().alphanum().min(3).max(25).trim(true).required(),
  state: joi.string().min(3).max(25).trim(true).required(),
  country: joi.string().min(3).max(25).trim(true).required(),
  district: joi.string().min(3).max(25).trim(true).required(),
});

const addressValidation = async (req, res, next) => {
  const payload = {
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    district: req.body.district,
  };

  const { error } = validation.validate(payload);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, `Error in Address Data : ${error.message}`)
    );
  } else {
    next();
  }
};

module.exports = addressValidation;
