const Category = require("../Model/category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).json({ message: "Succesful", categories });
  } catch (error) {
    res.status(400).json({
      message: "Category medeeleliig avahad aldaa garlaa",
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { title, description, categoryImg, categoryRating } = req.body;
  if (!title || !description || !categoryImg || !categoryRating) {
    res.status(400).json({ message: "ali neg ni hooson bn" });
    return;
  }
  try {
    const category = await Category.create({
      title,
      description,
      categoryImg,
      categoryRating,
    });
    res.status(201).json({ message: "Succesful", category });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai category oldsongui` });
    return;
  }

  try {
    const category = await Category.findById(id);
    res.status(201).json({ message: "Succesful", category });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.body);

  if (!id) {
    res.status(400).json({ message: `${id}, tai category oldsongui` });
    return;
  }

  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("category".green, category);
    res.status(201).json({ message: "Succesfully updated", category });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: `${id}, tai category oldsongui` });
    return;
  }

  try {
    const category = await Category.findByIdAndDelete(id);
    res.status(201).json({ message: "Succesfully deleted", category });
  } catch (error) {
    res.status(400).json({ message: "ERROR", error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
