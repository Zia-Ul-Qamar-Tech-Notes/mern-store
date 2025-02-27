const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Assume you have a Product model

// Search API
router.get("/", async (req, res) => {
  try {
    const query = req.query.q;
    console.log("query", query);
    if (!query) return res.json([]);

    const results = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(3);
    console.log("results", results);
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
