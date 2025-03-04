const Review = require("../models/Review");
const Product = require("../models/Product");

exports.getMostReviewedProduct = async (req, res) => {
  try {
    const mostReviewed = await Review.aggregate([
      {
        $group: {
          _id: "$product", // Group by product ID
          reviewCount: { $sum: 1 }, // Count the number of reviews per product
        },
      },
      { $sort: { reviewCount: -1 } }, // Sort by highest review count
      { $limit: 1 }, // Get only the top product
    ]);

    if (mostReviewed.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    // Fetch full product details
    const product = await Product.findById(mostReviewed[0]._id);

    res
      .status(200)
      .json({ product, totalReviews: mostReviewed[0].reviewCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching most reviewed product" });
  }
};

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const created = await new Review(req.body).populate({
      path: "user",
      select: "-password",
    });
    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error posting review, please trying again later" });
  }
};

exports.getByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = req.query.limit;
      const page = req.query.page;

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Review.find({ product: id })
      .countDocuments()
      .exec();
    const result = await Review.find({ product: id })
      .skip(skip)
      .limit(limit)
      .populate("user")
      .exec();

    res.set("X-total-Count", totalDocs);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting reviews for this product, please try again later",
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("user");
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating review, please try again later" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting review, please try again later" });
  }
};
