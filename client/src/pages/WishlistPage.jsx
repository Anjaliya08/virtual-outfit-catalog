import React from "react";
import { useOutfit } from "../context/OutfitContext";
import "./WishlistPage.css";

export default function WishlistPage() {
  const { wishlistItems = [], removeFromWishlist = () => {} } = useOutfit() || {};

  if (!Array.isArray(wishlistItems)) {
    return <p>Wishlist data is not available or corrupted.</p>;
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">💖 My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="empty-message">No outfits in wishlist.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((outfit) => (
            <div key={outfit._id} className="wishlist-card">
              <img src={outfit.imageUrl} alt={outfit.name} className="wishlist-image" />
              <h4 className="wishlist-name">{outfit.name}</h4>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(outfit._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
