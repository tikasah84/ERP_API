const mongoose = require("mongoose");
const { Schema } = mongoose;
const Address = require("../models/address");
const userSchema = Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      maxlength: 10,
      required: true,
    },
    birthYear: {
      type: Number,
      max: 2000,
      min: 1900,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: Address,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
