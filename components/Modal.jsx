"use client";

import AddProductModal from "./AddProductModal";

export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="bg-white shadow-2xl p-6 w-full max-w-md z-50 relative">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black uppercase tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black transition text-2xl leading-none w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
