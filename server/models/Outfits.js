const mongoose = require("mongoose");

const outfitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  sizes: [{ type: String }],
  price: { type: Number, required: true },
  styleTags: [{ type: String }],
  occasion: { type: String }  // <-- add this field for filtering by occasion
});

module.exports = mongoose.model("Outfit", outfitSchema);
