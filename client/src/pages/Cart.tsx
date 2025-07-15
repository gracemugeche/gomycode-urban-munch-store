import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-purple-900 mb-6 text-center md:text-left">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="font-semibold text-slate-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5
                   w-full sm:w-auto justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.product)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.product)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold text-purple-700 min-w-[80px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => {
                        removeItem(item.product);
                        toast.success(`${item.name} removed from cart 🗑️`);
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
              <Link
                to="/"
                className="text-purple-700 hover:text-purple-900 text-sm font-medium"
              >
                ← Continue Shopping
              </Link>

              <div className="text-center sm:text-right">
                <p className="text-lg font-semibold text-slate-800">
                  Total:{" "}
                  <span className="text-purple-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={handleCheckout}
                  className="mt-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2
                   rounded-lg transition w-full sm:w-auto"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
