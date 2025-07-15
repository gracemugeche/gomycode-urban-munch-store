import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-center px-4">
      <div>
        <div className="text-5xl text-green-600 mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Order Received</h1>
        <p className="text-gray-600 mb-6">
          Thank you! You will get a confirmation message shortly.
        </p>
        <Link
          to="/"
          className="inline-block bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
