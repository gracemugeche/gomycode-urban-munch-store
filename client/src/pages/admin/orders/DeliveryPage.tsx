import { useEffect, useState } from "react";
import {
  getMyDeliveries,
  updateDeliveryStatus,
} from "../../../services/deliveryService";
import type { DeliveryOrder } from "../../../services/deliveryService";

export default function DeliveryPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getMyDeliveries(token);
      console.log("📦 Deliveries fetched:", data);
      setOrders(data);
    } catch (err) {
      console.error("Failed to load deliveries", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    await updateDeliveryStatus(orderId, newStatus, "", token || "");
    fetchDeliveries();
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading deliveries...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-700 text-center">
        My Deliveries
      </h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-500">No deliveries found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-semibold text-lg mb-2 text-gray-800">
                Order #{order._id.slice(-6)}
              </h2>

              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>
                  <strong>Address:</strong> {order.deliveryAddress.street},{" "}
                  {order.deliveryAddress.city}
                </p>
                <p>
                  <strong>Phone:</strong> {order.deliveryAddress.phone}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-white text-xs ${
                      order.deliveryStatus === "pending"
                        ? "bg-gray-400"
                        : order.deliveryStatus === "in_progress"
                        ? "bg-yellow-500"
                        : order.deliveryStatus === "delivered"
                        ? "bg-green-600"
                        : "bg-red-500"
                    }`}
                  >
                    {order.deliveryStatus}
                  </span>
                </p>
              </div>

              <div className="space-y-2 mb-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover border"
                    />
                    <p>
                      {item.quantity} x {item.name} - ${item.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              <button
                onClick={() => handleStatusUpdate(order._id, "in_progress")}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 text-sm"
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusUpdate(order._id, "delivered")}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
              >
                Mark Delivered
              </button>
              <button
                onClick={() => handleStatusUpdate(order._id, "cancelled")}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
