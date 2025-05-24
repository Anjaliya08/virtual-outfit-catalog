import React, { createContext, useContext, useState } from "react";

const OutfitContext = createContext();

export const useOutfit = () => useContext(OutfitContext);

export const OutfitProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToWishlist = (outfit) => {
    setWishlistItems((prev) => {
      if (!prev.find((item) => item._id === outfit._id)) {
        return [...prev, outfit];
      }
      return prev;
    });
  };

  const addToCart = (outfit) => {
    setCartItems((prev) => {
      if (!prev.find((item) => item._id === outfit._id)) {
        return [...prev, outfit];
      }
      return prev;
    });
  };

  const removeFromWishlist = (outfitId) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== outfitId));
  };

  const removeFromCart = (outfitId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== outfitId));
  };

  const clearWishlist = () => setWishlistItems([]);
  const clearCart = () => setCartItems([]);

  return (
    <OutfitContext.Provider
      value={{
        wishlistItems,
        cartItems,
        addToWishlist,
        addToCart,
        removeFromWishlist,
        removeFromCart,
        clearWishlist,
        clearCart,
      }}
    >
      {children}
    </OutfitContext.Provider>
  );
};
