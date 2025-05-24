import React from "react";
import { useOutfit } from "../context/OutfitContext";
import "./CartPage.css";

export default function CartPage() {
  // Destructure cartItems safely with a default empty array
  const { cartItems = [], removeFromCart = () => {} } = useOutfit() || {};

  if (!Array.isArray(cartItems)) {
    return <p>Cart data is not available or corrupted.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-message">No items in the cart.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((outfit) => (
            <div key={outfit._id} className="cart-card">
              <img src={outfit.imageUrl} alt={outfit.name} className="cart-image" />
              <h4 className="cart-name">{outfit.name}</h4>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(outfit._id)}
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
