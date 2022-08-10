const User = require("../../models/user");
const errorFunction = require("../../utils/errorFunction");
const securePassword = require("./../../utils/securePassword");

const addUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    }).lean(true);
    if (existingUser) {
      res.status(403);
      return res.json(errorFunction(true, "User Already Exists"));
    } else {
      const hashedPassword = await securePassword(req.body.password);
      const newUser = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        mobileNumber: req.body.mobileNumber,
        birthYear: req.body.birthYear,
        address: req.body.address,
        is_active: req.body.is_active,
      });
      if (newUser) {
        const userData = {
          id: newUser._id,
          userName: newUser.userName,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          gender: newUser.gender,
          mobileNumber: newUser.mobileNumber,
          birthYear: newUser.birthYear,
          address: newUser.address,
          is_active: newUser.is_active,
        };
        res.status(201);
        return res.json(errorFunction(false, "User Created", userData));
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Error Creating User"));
      }
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    return res.json(errorFunction(true, "Error Adding user"));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const projection = { password: 0 };
    const allUsers = await User.find().select(projection).lean(true);
    if (allUsers) {
      res.status(201);
      return res.json(errorFunction(false, "Sending all users", allUsers));
    } else {
      res.status(403);
      return res.json(errorFunction(true, "Error getting Users"));
    }
  } catch (error) {
    res.status(400);
    return res.json(errorFunction(true, "error getting user"));
  }
};

const login = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    }).lean(true);
    if (existingUser) {
      const isPasswordMatch = await securePassword(
        req.body.password,
        existingUser.password
      );
      if (isPasswordMatch) {
        const userData = {
          id: existingUser._id,
          userName: existingUser.userName,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser,
        };
        res.status(201);
        return res.json(errorFunction(false, "User Logged In", userData));
      }
    }
  } catch (err) {
    res.status(400);
    return res.json(errorFunction(true, "Error getting user"));
  }
};

module.exports = { addUser, getUsers, login };
