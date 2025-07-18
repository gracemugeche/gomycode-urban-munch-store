import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full text-center">
        <div className="text-6xl text-green-500 mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-purple-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with Urban Munch! Your order is being processed.
          You can track your order in the <span className="font-medium">"Your Orders"</span> section.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
