"use client";

import ProductItem from "./ProductItem";

export default function ProductGrid({
  products,
  selectedSizes,
  onSizeSelect,
  onAddToCart,
  addedToCart,
  onResetFilters,
}) {
  if (products.length === 0) {
    return (
      <div className="px-6 py-20">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters
          </p>
          <button
            onClick={onResetFilters}
            className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 transition text-sm font-medium uppercase tracking-wide"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            selectedSize={selectedSizes[product.id]}
            onSizeSelect={onSizeSelect}
            onAddToCart={onAddToCart}
            isAdded={addedToCart === product.id}
          />
        ))}
      </div>
    </section>
  );
}
