const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: [500, "tailbar 500 temdegtees ihgui baina"],
  },
  categoryImg: {
    type: String,
  },
  categoryRating: {
    type: Number,
  },
});

const category = mongoose.model("category", CategorySchema);

module.exports = category;
