"use client";

import { useState } from "react";

export default function AddProductModal({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isClothing, setIsClothing] = useState(false);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [imgError, setImgError] = useState(false);

  const placeholder = "https://via.placeholder.com/600?text=No+Image";

  const toggleSize = (size) => {
    setAvailableSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !image) return;

    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      image,
      quantity: parseInt(quantity, 10),
      isClothing,
      availableSizes: isClothing ? availableSizes : [],
    };

    onAddProduct(newProduct);

    // reset form
    setTitle("");
    setPrice("");
    setImage("");
    setQuantity(1);
    setIsClothing(false);
    setAvailableSizes([]);
    setImgError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Image preview */}
      <div className="w-full h-32 bg-gray-50 flex items-center justify-center border border-gray-300">
        <img
          src={imgError || !image ? placeholder : image}
          alt="preview"
          className="w-full h-full object-contain p-2"
          onError={(e) => {
            setImgError(true);
            e.currentTarget.src = placeholder;
          }}
        />
      </div>

      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-black text-sm"
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-black text-sm"
        min="0"
        step="0.01"
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
          setImgError(false);
        }}
        className="border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-black text-sm"
        required
      />

      {/* Quantity input */}
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-black text-sm"
        min="1"
        required
      />

      {/* Clothing toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isClothing}
          onChange={(e) => setIsClothing(e.target.checked)}
          className="border-gray-300"
        />
        <span className="text-sm text-gray-700">This is a clothing item (add sizes)</span>
      </label>

      {/* Sizes selector */}
      {isClothing && (
        <div>
          <div className="text-xs font-semibold mb-2 uppercase tracking-wider text-gray-900">Available Sizes</div>
          <div className="flex gap-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-9 h-9 border text-xs font-medium transition ${
                  availableSizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {availableSizes.length === 0 && (
            <p className="text-xs text-red-600 mt-2">Select at least one size</p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="bg-black text-white py-3 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium uppercase tracking-wide mt-2"
        disabled={isClothing && availableSizes.length === 0}
      >
        Add Product
      </button>
    </form>
  );
}

