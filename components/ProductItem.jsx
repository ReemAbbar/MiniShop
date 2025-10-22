"use client";

export default function ProductItem({
  product,
  selectedSize,
  onSizeSelect,
  onAddToCart,
  isAdded,
}) {
  return (
    <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col h-[480px] w-full group">
      {/* Image Container */}
      <div
        className="relative w-full bg-gray-50 overflow-hidden"
        style={{ aspectRatio: "3 / 4" }}
      >
        <img
          src={product.image || "https://via.placeholder.com/600?text=No+Image"}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          onError={(e) =>
            (e.currentTarget.src = "https://via.placeholder.com/600?text=No+Image")
          }
        />
        {product.quantity <= 0 && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
            <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Out of Stock</span>
          </div>
        )}
        
        {/* Discount Badge (optional - SHEIN style) */}
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase">
          NEW
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-sm text-gray-800 mb-2 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-black mb-3">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Sizes Section */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Size</p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSizeSelect(product.id, size)}
                  className={`w-9 h-9 border text-xs font-medium transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-700 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.quantity <= 0}
          className={`w-full font-medium py-2.5 transition-all duration-200 text-sm uppercase tracking-wide ${
            isAdded
              ? "bg-green-600 text-white border border-green-600"
              : product.quantity > 0
              ? "border border-black text-black hover:bg-black hover:text-white"
              : "border border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
          }`}
        >
          {isAdded ? (
            <span className="flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Added
            </span>
          ) : product.sizes &&
            product.sizes.length > 0 &&
            !selectedSize ? (
            "Select Size"
          ) : product.quantity <= 0 ? (
            "Out of Stock"
          ) : (
            "Add to Bag"
          )}
        </button>
      </div>
    </div>
  );
}
