const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
