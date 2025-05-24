import React from "react";
import { useOutfit } from "../context/OutfitContext";
import "./OutfitCard.css";

export default function OutfitCard({ outfit }) {
  const { addToWishlist, addToCart } = useOutfit();

  // Full image path with backend base URL
  const imageSrc = outfit.imageUrl.startsWith("http")
    ? outfit.imageUrl
    : `http://localhost:5000${outfit.imageUrl}`;

  return (
    <div className="outfit-card">
      <img src={imageSrc} alt={outfit.name} className="outfit-image" />
      <div className="outfit-details">
        <h3 className="outfit-name">{outfit.name}</h3>
        <p className="outfit-occasion">{outfit.occasion}</p>
        <div className="outfit-buttons">
          <button onClick={() => addToWishlist(outfit)} className="outfit-btn wishlist-btn">
            💖 Wishlist
          </button>
          <button onClick={() => addToCart(outfit)} className="outfit-btn cart-btn">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
