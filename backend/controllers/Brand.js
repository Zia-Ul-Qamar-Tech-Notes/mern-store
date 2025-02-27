const Brand = require("../models/Brand");

exports.getAll = async (req, res) => {
  try {
    const result = await Brand.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching brands" });
  }
};

exports.addBrand = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the brand already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const newBrand = new Brand({ name });
    await newBrand.save();

    res.status(201).json(newBrand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding brand" });
  }
};
