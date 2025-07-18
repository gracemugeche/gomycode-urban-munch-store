import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/ProductService";
import type { Product } from "../types/product";

const Groceries = () => {
  const [groceries, setGroceries] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      const filtered = allProducts.filter((p) => p.category === "groceries");
      setGroceries(filtered);
    };

    loadProducts();
  }, []);

  const filteredGroceries = groceries.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Title and Intro */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[rgb(63,56,70)]">Grocery Essentials</h1>
        <p className="text-gray-600 mt-2">
          Everything you need for your kitchen — fresh, local, and delivered fast.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search groceries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-purple-600"
        />
      </div>

      {/*  Product Grid */}
      {filteredGroceries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGroceries.map((item) => (
            <ProductCard key={item._id} product={{ ...item, id: item._id }} />
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No groceries found matching your search.
        </p>
      )}
    </div>
  );
};

export default Groceries;
