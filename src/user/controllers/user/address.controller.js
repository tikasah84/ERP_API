const Address = require("../../models/address");
const errorFunction = require("../../../utils/errorFunction");

const addAddress = async (req, res, next) => {
  try {
    const existingCity = await Address.findOne({
      city: req.body.city,
    }).lean(true);
    if (existingCity) {
      res.status(403);
      return res.json(errorFunction(true, "Ciry Already Exists"));
    } else {
      const newAddress = await Address.create({
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        district: req.body.district,
      });
      if (newAddress) {
        const addressData = {
          id: newAddress._id,
          city: newAddress.city,
          state: newAddress.state,
          country: newAddress.country,
          district: newAddress.district,
        };
        res.status(201);
        return res.json(errorFunction(false, "Address Created", addressData));
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Error Creating Address"));
      }
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    return res.json(errorFunction(true, "Error Adding Address"));
  }
};

const getAddress = async (req, res, next) => {
  try {
    const allAddress = await Address.find();
    if (allAddress) {
      res.status(201);
      return res.json(errorFunction(false, "Sending all address", allAddress));
    } else {
      res.status(403);
      return res.json(errorFunction(true, "Error getting Users"));
    }
  } catch (error) {
    res.status(400);
    return res.json(errorFunction(true, "Error getting user"));
  }
};

module.exports = { addAddress, getAddress };
