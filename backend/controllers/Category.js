const Category = require("../models/Category");

exports.getAll = async (req, res) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    // Check if the Category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding Category" });
  }
};
