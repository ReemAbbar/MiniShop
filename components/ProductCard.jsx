"use client";

export default function ProductCard({ product }) {
  const addToOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ ...product, quantity: 1 });
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("🛒 Added to Cart!");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition transform duration-300 flex flex-col overflow-hidden">
      <div className="relative w-full h-60 bg-gray-50 flex items-center justify-center">
        <img src={product.image} alt={product.title} className="max-h-full object-contain p-4" />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold text-gray-900 text-base truncate">{product.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        <p className="text-blue-600 font-bold text-lg mt-2">${product.price}</p>

        <button
          onClick={addToOrder}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 1.293A1 1 0 007 16h10m-4 0a2 2 0 104 0m-4 0a2 2 0 11-4 0" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

