import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.title === product.title);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productTitle) => {
    setCart((prevCart) => prevCart.filter((item) => item.title !== productTitle));
  }, []);

  const updateQuantity = useCallback((productTitle, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productTitle);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.title === productTitle ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotal = useCallback(() => {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('₹ ', ''));
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
