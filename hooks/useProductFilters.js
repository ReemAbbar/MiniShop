export function useProductFilters(products) {
  const filterProducts = (filters) => {
    return products.filter((product) => {
      // Category filter
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const price = product.price;
        switch (filters.priceRange) {
          case "under25":
            if (price >= 25) return false;
            break;
          case "25to50":
            if (price < 25 || price >= 50) return false;
            break;
          case "50to100":
            if (price < 50 || price >= 100) return false;
            break;
          case "over100":
            if (price < 100) return false;
            break;
        }
      }

      // Size filter
      if (filters.size !== "all") {
        if (!product.sizes || !product.sizes.includes(filters.size)) {
          return false;
        }
      }

      // Stock filter
      if (filters.inStock !== "all") {
        if (filters.inStock === "inStock" && product.quantity <= 0) {
          return false;
        }
        if (filters.inStock === "outOfStock" && product.quantity > 0) {
          return false;
        }
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDescription = product.description?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  };

  const getCategories = () => {
    return [...new Set(products.map((p) => p.category))].filter(Boolean);
  };

  const getAllSizes = () => {
    return [...new Set(products.flatMap((p) => p.sizes || []))].sort();
  };

  return { filterProducts, getCategories, getAllSizes };
}
