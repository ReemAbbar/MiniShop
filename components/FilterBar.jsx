"use client";

export default function FilterBar({
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  categories,
  allSizes,
  filteredCount,
  onReset,
}) {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for products..."
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 focus:outline-none focus:border-black text-sm"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white hover:bg-gray-800 transition text-sm font-medium uppercase tracking-wide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filter
            <span className="text-xs">{showFilters ? "▲" : "▼"}</span>
          </button>

          {/* Results Count */}
          <div className="text-gray-600 text-sm font-medium">
            {filteredCount} {filteredCount === 1 ? "Item" : "Items"}
          </div>
        </div>

      {/* Expanded Filter Panel */}
      {showFilters && (
        <div className="mt-4 pb-4 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              >
                <option value="all">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Price
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              >
                <option value="all">All</option>
                <option value="under25">Under $25</option>
                <option value="25to50">$25 - $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="over100">$100+</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Size
              </label>
              <select
                value={filters.size}
                onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              >
                <option value="all">All</option>
                {allSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                Stock
              </label>
              <select
                value={filters.inStock}
                onChange={(e) =>
                  setFilters({ ...filters, inStock: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              >
                <option value="all">All</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={onReset}
              className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm font-medium uppercase tracking-wide"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
