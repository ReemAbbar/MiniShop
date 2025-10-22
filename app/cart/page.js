"use client";

import { useEffect, useState } from "react";
import { getStripe } from "@/lib/stripe";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    // normalize items so each has quantity and keep selectedSize if present
    const normalized = savedCart.map((it) => ({
      ...it,
      id: String(it.id), // Ensure ID is a string
      quantity:
        typeof it.quantity === "number" && it.quantity > 0
          ? it.quantity
          : 1,
      selectedSize: it.selectedSize ?? null,
    }));
    setCart(normalized);
    // keep localStorage consistent
    localStorage.setItem("cart", JSON.stringify(normalized));
  }, []);

  // update quantity by product id + selectedSize
  const updateQty = (id, selectedSize, qty) => {
    if (qty < 1) {
      // remove item if qty becomes less than 1
      removeItem(id, selectedSize);
      return;
    }
    const updatedCart = cart.map((item) =>
      String(item.id) === String(id) && (item.selectedSize ?? null) === (selectedSize ?? null)
        ? { ...item, quantity: qty }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Dispatch event to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // remove item by product id + selectedSize
  const removeItem = (id, selectedSize) => {
    const updatedCart = cart.filter(
      (item) => !(String(item.id) === String(id) && (item.selectedSize ?? null) === (selectedSize ?? null))
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // Dispatch event to update cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Handle Stripe checkout
  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // Call the checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Checkout error:', data.error);
        alert('Failed to create checkout session. Please try again.');
        setLoading(false);
        return;
      }

      if (!data.url) {
        console.error('No checkout URL received');
        alert('Failed to create checkout session. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout URL
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2 uppercase tracking-tight">Your Bag is Empty</h2>
          <p className="text-gray-500 mb-6">Add items to get started</p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 transition text-sm font-medium uppercase tracking-wide"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 uppercase tracking-tight">Shopping Bag ({cart.length})</h1>
      <div className="grid grid-cols-1 gap-4">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.selectedSize ?? "nosize"}`}
            className="relative flex flex-col sm:flex-row items-start bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all"
          >
            {/* Product Image */}
            <div className="w-full sm:w-32 flex justify-center items-center bg-gray-50 h-32 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full object-contain p-2"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 sm:px-4 mt-3 sm:mt-0 w-full">
              <h2 className="font-semibold text-black text-sm line-clamp-2 mb-2">
                {item.title}
              </h2>

              {/* Show chosen size if present */}
              {item.selectedSize && (
                <p className="text-xs text-gray-600 mb-2">
                  Size: <span className="font-semibold text-black">{item.selectedSize}</span>
                </p>
              )}

              <p className="text-lg font-bold text-black mb-3">
                ${Number(item.price).toFixed(2)}
              </p>

              <div className="flex items-center justify-between">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border border-gray-300">
                  <button
                    onClick={() =>
                      updateQty(item.id, item.selectedSize, (item.quantity || 1) - 1)
                    }
                    className="px-3 py-1.5 hover:bg-gray-100 text-sm font-medium"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQty(item.id, item.selectedSize, (item.quantity || 1) + 1)
                    }
                    className="px-3 py-1.5 hover:bg-gray-100 text-sm font-medium"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.id, item.selectedSize)}
                  className="text-gray-600 hover:text-red-600 text-xs font-medium uppercase tracking-wider underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-8 bg-white border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4 text-lg">
          <span className="font-semibold text-gray-700">Subtotal:</span>
          <span className="font-bold text-black text-2xl">${totalAmount.toFixed(2)}</span>
        </div>
        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-black text-white py-4 hover:bg-gray-800 transition text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Proceed to Checkout
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center mt-3">
          Secure payment powered by Stripe
        </p>
      </div>
      </div>
    </main>
  );
}







