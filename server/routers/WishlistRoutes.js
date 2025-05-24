const express = require("express");
const router = express.Router();
const WishlistItem = require("../models/WishlistItem");

// Add to wishlist
router.post("/", async (req, res) => {
  const { outfitId, userId } = req.body;
  try {
    const exists = await WishlistItem.findOne({ outfitId, userId });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    const newItem = new WishlistItem({ outfitId, userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's wishlist
router.get("/:userId", async (req, res) => {
  try {
    const items = await WishlistItem.find({ userId: req.params.userId }).populate("outfitId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from wishlist
router.delete("/:id", async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
