import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/ProductService";
import type { Product } from "../types/product";
import RecipeSection from "../components/RecipeSection";

const Meal = () => {
  const [meals, setMeals] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      const filtered = allProducts.filter((p) => p.category === "meals");
      setMeals(filtered);
    };

    loadProducts();
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-[rgb(63,56,70)] text-center mb-3">
        Our Meals
      </h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-6">
        Discover delicious, chef-prepared meals made with fresh ingredients and bold flavors.
      </p>

      {/* Search bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search meals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 
          focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Meal grid or fallback */}
      {filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMeals.map((meal) => (
            <ProductCard key={meal._id} product={{ ...meal, id: meal._id }} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No meals found.</p>
      )}

      {/* recipe section */}
      <RecipeSection />
    </div>
  );
};

export default Meal;
