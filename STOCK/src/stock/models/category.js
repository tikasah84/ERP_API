const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
