"use client";

import "./globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Function to update cart count
    const updateCartCount = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = savedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleCartUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleCartUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col font-sans">
        {/* Header */}
        <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
            {/* Logo/Title */}
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-gray-300 transition"
            >
              MINI SHOP
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-white hover:text-gray-300 text-sm font-medium uppercase tracking-wide hidden sm:block"
              >
                Products
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center gap-2"
              >
                {/* Cart Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="text-sm font-medium uppercase hidden sm:inline">Bag</span>
                {/* Cart Count Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow w-full">{children}</main>

        {/* Footer */}
        <footer className="bg-black text-white border-t border-gray-800 py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              © {new Date().getFullYear()} MINI SHOP. All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
