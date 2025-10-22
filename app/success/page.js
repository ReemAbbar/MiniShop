"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    // Clear the cart after successful payment
    if (sessionId && !isClearing) {
      setIsClearing(true);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  }, [sessionId, isClearing]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
          {sessionId && (
            <p className="text-xs text-gray-500 mb-6 font-mono bg-gray-50 p-2 border border-gray-200">
              Order ID: {sessionId.slice(-12)}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-black text-white py-3 hover:bg-gray-800 transition text-sm font-bold uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="block w-full border border-black text-black py-3 hover:bg-black hover:text-white transition text-sm font-medium uppercase tracking-wide"
          >
            View Orders
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            A confirmation email will be sent to your email address.
          </p>
        </div>
      </div>
    </main>
  );
}
