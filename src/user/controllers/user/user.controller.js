const User = require("../../models/user");
const errorFunction = require("../../../utils/errorFunction");
var jwt = require("jsonwebtoken");
const {
  securePassword,
  checkPassword,
} = require("../../../utils/securePassword");

//Signup new user here

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
    return res.json(errorFunction(true, "Error Adding user"));
  }
};

//Get all user

const getUsers = async (req, res, next) => {
  try {
    const projection = { password: 0 };
    const allUsers = await User.find()
      .select(projection)
      .populate({ path: "address", select: "city state " })
      .lean(true);
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

//Login user

const login = async (req, res, next) => {
  try {
    var data = await User.find({ email: req.body.email }).exec();
    if (data.length < 1) {
      res.status(403);
      return res.json(errorFunction(true, "User Not Found"));
    } else {
      existingUser = data[0];
    }

    if (existingUser) {
      const isPasswordMatch = await checkPassword(
        req.body.password,
        existingUser.password
      );
      if (isPasswordMatch) {
        var userData = {
          id: existingUser._id,
          userName: existingUser.userName,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
        };
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Invalid Password"));
      }

      jwt.sign(
        {
          data: userData,
        },
        process.env.SECRET_KEY,
        { expiresIn: 60 },
        (err, token) => {
          if (err) {
            res.status(403);

            return res.json(errorFunction(true, "Error Signing Token"));
          } else {
            res.status(201);
            return res.json(
              errorFunction(false, "Login Successful", { token: token })
            );
          }
        }
      );
    }
  } catch (error) {
    res.status(400);
    return res.json(errorFunction(true, "Error Logging In"));
  }
};

//get profile information

const profile = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403);
    return res.json(errorFunction(true, "No Authorization"));
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(403);
        return res.json(errorFunction(true, err));
      } else {
        const userData = {
          id: decoded.data.id,
          userName: decoded.data.userName,
          firstName: decoded.data.firstName,
          lastName: decoded.data.lastName,
          email: decoded.data.email,
        };
        res.status(201);
        return res.json(errorFunction(false, "Profile", userData));
      }
    });
  }
};

module.exports = { addUser, getUsers, login, profile };
