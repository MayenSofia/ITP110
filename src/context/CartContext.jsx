import React, { createContext, useContext, useState, useEffect } from "react";
// import the Toast class directly to avoid relying on window.bootstrap
import Toast from 'bootstrap/js/dist/toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cartData");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (name, price, image) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((i) =>
          i.name === name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: Date.now(), name, price, image, quantity: 1 }];
    });

    const toast = document.getElementById("cartToast");
    if (toast) {
      const body = toast.querySelector(".toast-body");
      body.textContent = `${name} added to cart!`;
      try {
        // Use imported Toast class
        const bsToast = new Toast(toast);
        bsToast.show();
      } catch (err) {
        // Fallback: toggle a simple visible class so the user gets feedback
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = ''; }, 1500);
        // eslint-disable-next-line no-console
        console.warn('Bootstrap Toast not available, fallback used.', err);
      }
    }
  };

  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isOpen,
        toggleCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
