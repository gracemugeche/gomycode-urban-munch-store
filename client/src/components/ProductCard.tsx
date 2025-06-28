import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    toast.success(`${quantity} x ${product.name} added to cart ✅`);
    setQuantity(1); // Reset after add
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-[rgb(63,56,70)]">{product.name}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-3">{product.description}</p>

      <div className="flex items-center justify-between mt-auto">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={decrement}
            disabled={quantity === 1}
            className={`bg-purple-200 px-2 rounded ${
              quantity === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-300"
            }`}
          >
            −
          </button>
          <span className="text-sm">{quantity}</span>
          <button
            onClick={increment}
            className="bg-purple-200 px-2 rounded hover:bg-purple-300"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          className="bg-purple-700 text-white text-sm px-3 py-1 rounded-md hover:bg-purple-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
