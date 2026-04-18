import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.title === product.title);
      if (existing) {
        return prev.map((i) =>
          i.title === product.title ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Pass the product title to remove one unit (or remove entirely if qty === 1)
  const removeFromCart = (title) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.title === title);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((i) => i.title !== title);
      return prev.map((i) =>
        i.title === title ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
