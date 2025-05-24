const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  outfitId: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", required: true },
  userId: { type: String, required: true }, // to associate with user
});

module.exports = mongoose.model("WishlistItem", wishlistItemSchema);
