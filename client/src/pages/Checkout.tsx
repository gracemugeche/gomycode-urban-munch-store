import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import DeliverySection from "../components/DeliverySection";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryAddress, setDeliveryAddress] = useState({
    phone: "",
    city: "",
    street: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      navigate("/login"); 
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders`,
        {
          orderItems: cartItems.map((item) => ({
            product: item.product,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          deliveryAddress,
          paymentMethod,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10 font-[Poppins]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 🧾 Left: Delivery & Payment */}
        <div className="md:col-span-2 border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Delivery & Payment</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <DeliverySection
              deliveryAddress={deliveryAddress}
              setDeliveryAddress={setDeliveryAddress}
              deliveryFee={0}
            />

            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <div className="space-y-2">
                {["cod", "stripe", "mpesa"].map((method) => (
                  <label className="flex items-center space-x-2" key={method}>
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span>
                      {method === "cod"
                        ? "Cash on Delivery"
                        : method === "stripe"
                        ? "Pay with Stripe"
                        : "Pay with M-Pesa"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-purple-700 hover:bg-purple-800 text-white font-semibold
               py-3 rounded transition"
            >
              Confirm Order
            </button>
          </form>
        </div>

        {/* 📦 Right: Summary */}
        <div className="border rounded-lg p-6 bg-gray-50 shadow-sm">
          <h2 className="text-xl font-bold text-purple-800 mb-4">Summary</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {cartItems.map((item) => (
              <li key={item.product} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="text-sm">
            <p className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </p>
            <p className="flex justify-between">
              <span>Fees</span>
              <span className="text-yellow-600">Discounted</span>
            </p>
            <p className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-purple-800">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
