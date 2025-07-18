const express = require("express");
const router = express.Router();
const categoryData = require("../models/CategoryModel");

router.get("/get", async (req, res) => {
  try {
    const categories = await categoryData.find();
    res.json(categories);
  } catch (err) {
    console.error("Error getting categories:", err);
    res.status(500).json({ message: "Failed to load categories" });
  }
});

module.exports = router;
