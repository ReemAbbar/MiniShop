import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product, selectedSize) => {
    const existing = cart.find(
      (item) =>
        String(item.id) === String(product.id) &&
        item.selectedSize === selectedSize
    );

    let updatedCart;
    if (existing) {
      if (existing.quantity + 1 > product.quantity) {
        return { success: false, message: "Not enough stock available" };
      }
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id) &&
        item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1, selectedSize }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    return { success: true };
  };

  return { cart, addToCart };
}
