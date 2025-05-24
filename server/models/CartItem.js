const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  outfitId: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
