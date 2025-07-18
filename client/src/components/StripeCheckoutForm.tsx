import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

type Props = {
  amount: number;
  cartItems: any[];
  deliveryAddress: { phone: string; city: string; street: string };
  clearCart: () => void;
  navigate: (path: string) => void;
};

const StripeCheckoutForm = ({
  amount,
  cartItems,
  deliveryAddress,
  clearCart,
  navigate,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const amountInCents = Math.round(amount * 100);

      const response = await axios.post<{ clientSecret: string }>(
        `${import.meta.env.VITE_API_BASE_URL}/stripe/create-payment-intent`,
        { amount: amountInCents, currency: "usd" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const clientSecret = response.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Payment failed.");
      } else {
        if (result.paymentIntent.status === "succeeded") {
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
              paymentMethod: "stripe",
              totalPrice: amount,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          clearCart();
          navigate("/order-success");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-700">Payment</h2>
      <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>

      <div className="flex items-center space-x-4 text-3xl text-gray-700">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcAmex />
        <FaCcDiscover />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <label className="block text-sm mb-1 text-gray-600">Card Number</label>
            <CardNumberElement
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>

          <div className="p-3 border rounded-md">
            <label className="block text-sm mb-1 text-gray-600">Expiry (MM/YY)</label>
            <CardExpiryElement
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>

          <div className="p-3 border rounded-md">
            <label className="block text-sm mb-1 text-gray-600">CVC</label>
            <CardCvcElement
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>

          <div className="p-3 border rounded-md">
            <label className="block text-sm mb-1 text-gray-600">ZIP / Postal Code</label>
            <input
              type="text"
              name="postal"
              placeholder="e.g. 90210"
              className="w-full p-2 border rounded focus:outline-purple-600 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold w-full py-3 rounded"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {message && <div className="text-red-500 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
