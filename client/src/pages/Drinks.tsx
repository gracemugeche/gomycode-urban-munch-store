import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/ProductService";
import type { Product } from "../types/product";

const Drink = () => {
  const [drinks, setDrinks] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      const filtered = allProducts.filter((p) => p.category === "drinks");
      setDrinks(filtered);
    };

    loadProducts();
  }, []);

  const filteredDrinks = drinks.filter((drink) =>
    drink.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-[rgb(63,56,70)] text-center mb-3">
        Refreshing Drinks
      </h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-6">
        From cold fruit blends to energizing teas, choose from our wide
        selection of refreshing beverages delivered to your doorstep.
      </p>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for a drink..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 
          focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {filteredDrinks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDrinks.map((drink) => (
            <ProductCard key={drink._id} product={{ ...drink, id: drink._id }} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No drinks found.</p>
      )}
    </div>
  );
};

export default Drink;
