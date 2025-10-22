import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const transformProduct = (apiProduct) => {
    const isClothing = ["men's clothing", "women's clothing"].includes(
      apiProduct.category
    );

    let sizes = [];
    if (isClothing) {
      sizes = ["XS", "S", "M", "L", "XL"];
    }

    return {
      id: String(apiProduct.id),
      title: apiProduct.title,
      price: apiProduct.price,
      image: apiProduct.image,
      category: apiProduct.category,
      description: apiProduct.description,
      quantity: 5,
      sizes: sizes,
    };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const cachedData = localStorage.getItem("products");
        const cacheTimestamp = localStorage.getItem("productsTimestamp");
        const oneHour = 60 * 60 * 1000;

        if (
          cachedData &&
          cacheTimestamp &&
          Date.now() - parseInt(cacheTimestamp) < oneHour
        ) {
          setProducts(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const apiProducts = await response.json();
        const transformedProducts = apiProducts.map(transformProduct);

        localStorage.setItem("products", JSON.stringify(transformedProducts));
        localStorage.setItem("productsTimestamp", String(Date.now()));
        setProducts(transformedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);

        const cachedData = localStorage.getItem("products");
        if (cachedData) {
          setProducts(JSON.parse(cachedData));
        } else {
          alert("Failed to load products. Please check your internet connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("productsTimestamp", String(Date.now()));
  };

  return { products, loading, updateProducts };
}
