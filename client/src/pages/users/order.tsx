import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get<Order[]>(
          `${import.meta.env.VITE_API_BASE_URL}/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <FaBoxOpen size={50} className="text-purple-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-6">You have no ongoing or past orders.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Explore Categories
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto font-[Poppins]">
      <h2 className="text-xl font-bold mb-6 text-slate-800">Your Orders</h2>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-5 rounded-xl shadow bg-white border hover:shadow-md transition"
          >
            <h3 className="font-semibold mb-2 text-slate-700">
              Order ID: <span className="text-purple-600">{order._id.slice(-6)}</span>
            </h3>

            <div className="space-y-3">
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-slate-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-700">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <p>
                <span className="font-medium text-slate-700">Total: </span>$
                {order.totalPrice.toFixed(2)}
              </p>
              <p
                className={`font-medium ${
                  order.isDelivered ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Ongoing"}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
