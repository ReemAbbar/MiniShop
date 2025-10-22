"use client";

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 shadow-xl hover:bg-gray-800 transition z-40 text-sm font-bold uppercase tracking-wider"
    >
      + Add Product
    </button>
  );
}
