const express = require("express");
const router = express.Router();
const Outfit = require("../models/Outfits");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to store uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// POST route to upload outfit with image and required fields
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, occasion, sizes, styleTags } = req.body;

    // Convert sizes and styleTags from comma-separated strings to arrays
    const sizesArray = sizes ? sizes.split(",").map(s => s.trim()) : [];
    const styleTagsArray = styleTags ? styleTags.split(",").map(s => s.trim()) : [];

    const newOutfit = new Outfit({
      name,
      category,
      price: Number(price),
      occasion,
      sizes: sizesArray,
      styleTags: styleTagsArray,
      imageUrl: `/uploads/${req.file.filename}`, // Store file path relative to server
    });

    await newOutfit.save();
    res.status(201).json({ message: "Outfit created", outfit: newOutfit });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload outfit", error: error.message });
  }
});

// GET outfits route with optional occasion filter
router.get("/", async (req, res) => {
  try {
    const { occasion } = req.query;
    const query = occasion && occasion !== "all" ? { occasion } : {};
    const outfits = await Outfit.find(query);
    res.status(200).json(outfits);
  } catch (error) {
    console.error("Fetch outfit error:", error);
    res.status(500).json({ message: "Failed to fetch outfits" });
  }
});

module.exports = router;
