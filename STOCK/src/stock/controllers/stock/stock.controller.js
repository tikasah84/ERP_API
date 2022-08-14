const Category = require("../../models/category");
const errorFunction = require("../../../utils/errorFunction");

//Signup new user here

const addCategory = async (req, res, next) => {
  try {
    const category = new Category({
      categoryName: req.body.categoryName,
    });
    const newCategory = await category.save();
    if (newCategory) {
      res.status(201);
      return res.json(errorFunction(false, "Category Added", newCategory));
    } else {
      res.status(403);
      return res.json(errorFunction(true, "Error Adding Category"));
    }
  } catch (error) {
    res.status(500);
    return res.json(errorFunction(true, "Error Adding Category"));
  }
};

//Get all user
const getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.find();
    if (allCategory) {
      res.status(200);
      return res.json(errorFunction(false, "All Category", allCategory));
    } else {
      res.status(403);
      return res.json(errorFunction(true, "Error Getting Category"));
    }
  } catch (error) {
    res.status(500);
    return res.json(errorFunction(true, "Error Getting Category"));
  }
};

module.exports = { addCategory, getAllCategory };
