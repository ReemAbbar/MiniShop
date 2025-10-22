"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useProductFilters } from "../hooks/useProductFilters";
import PageHeader from "../components/PageHeader";
import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessToast from "../components/SuccessToast";
import FloatingAddButton from "../components/FloatingAddButton";
import Modal from "../components/Modal";
import AddProductModal from "../components/AddProductModal";

export default function Home() {
  const { products, loading, updateProducts } = useProducts();
  const { cart, addToCart: addToCartHook } = useCart();
  const { filterProducts, getCategories, getAllSizes } = useProductFilters(products);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedToCart, setAddedToCart] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    size: "all",
    inStock: "all",
    searchQuery: "",
  });

  // Filter products
  const filteredProducts = filterProducts(filters);
  const categories = getCategories();
  const allSizes = getAllSizes();

  // Add new product
  const handleAddProduct = (newProduct) => {
    const productWithDefaults = {
      ...newProduct,
      id: String(Date.now()),
      quantity: newProduct.quantity || 5,
      sizes: newProduct.sizes || newProduct.availableSizes || [],
      category: newProduct.category || "custom",
    };
    const updated = [...products, productWithDefaults];
    updateProducts(updated);
    setShowAddForm(false);
  };

  // Handle size selection
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    // Check if product needs size selection
    if (product.sizes && product.sizes.length > 0 && !selectedSizes[product.id]) {
      alert("Please select a size first");
      return;
    }

    // Check if product is in stock
    if (product.quantity <= 0) {
      alert("Sorry, this product is out of stock");
      return;
    }

    const selectedSize = selectedSizes[product.id];
    const result = addToCartHook(product, selectedSize);

    if (!result.success) {
      alert(result.message);
      return;
    }

    // Update product quantity in stock
    const updatedProducts = products.map((p) =>
      String(p.id) === String(product.id) ? { ...p, quantity: p.quantity - 1 } : p
    );
    updateProducts(updatedProducts);

    // Show visual feedback
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      size: "all",
      inStock: "all",
      searchQuery: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 relative">
      <PageHeader title="Mini Inventory & Order Tracker" />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            categories={categories}
            allSizes={allSizes}
            filteredCount={filteredProducts.length}
            onReset={resetFilters}
          />

          <ProductGrid
            products={filteredProducts}
            selectedSizes={selectedSizes}
            onSizeSelect={handleSizeSelect}
            onAddToCart={handleAddToCart}
            addedToCart={addedToCart}
            onResetFilters={resetFilters}
          />
        </>
      )}

      <SuccessToast show={!!addedToCart} />

      <FloatingAddButton onClick={() => setShowAddForm(true)} />

      <Modal
        show={showAddForm}
        onClose={() => setShowAddForm(false)}
        title="Add New Product"
      >
        <AddProductModal
          onAddProduct={handleAddProduct}
          onClose={() => setShowAddForm(false)}
        />
      </Modal>
    </main>
  );
}
