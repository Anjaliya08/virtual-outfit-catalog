const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");

// Add to cart
router.post("/", async (req, res) => {
  const { outfitId, userId } = req.body;
  try {
    const exists = await CartItem.findOne({ outfitId, userId });
    if (exists) return res.status(400).json({ message: "Already in cart" });

    const newItem = new CartItem({ outfitId, userId });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's cart items
router.get("/:userId", async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.params.userId }).populate("outfitId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from cart
router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
