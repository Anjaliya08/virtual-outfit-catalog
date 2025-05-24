const Outfit = require("../models/Outfits");

// Create new outfit
exports.createOutfit = async (req, res) => {
  try {
    const newOutfit = new Outfit(req.body);
    await newOutfit.save();
    res.status(201).json(newOutfit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all outfits (with optional occasion filter)
exports.getOutfits = async (req, res) => {
  try {
    const { occasion } = req.query;
    let filter = {};

    if (occasion && occasion !== "all") {
      filter.occasion = occasion;
    }

    const outfits = await Outfit.find(filter);
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
