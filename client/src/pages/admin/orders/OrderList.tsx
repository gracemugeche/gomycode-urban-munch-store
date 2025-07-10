import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  orderItems: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  deliveryAddress: {
    street: string;
    city: string;
    phone: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  deliveryWorker?: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [workers, setWorkers] = useState<{ _id: string; name: string }[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const res = await axios.get<Order[]>(
          `${import.meta.env.VITE_API_BASE_URL}/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [getToken]);

  const fetchWorkers = async () => {
    const token = await getToken();
    const res = await axios.get<{ _id: String; name: String }[]>(
      `${import.meta.env.VITE_API_BASE_URL}/users?role=worker`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setWorkers(
      (res.data as any[]).map((worker) => ({
        _id: String(worker._id),
        name: String(worker.name),
      }))
    );
  };

  const assignWorker = async (orderId: string, workerId: string) => {
    const token = await getToken();
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/delivery/assign`,
      { orderId, workerId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSelectedOrderId(null);
    window.location.reload();
  };

  return (
    <div className="p-6 font-[Poppins] bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
            >
              <div className="mb-4 border-b pb-3">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Order ID:</span>{" "}
                  {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">User:</span>{" "}
                  {order.user.name} ({order.user.email})
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Created:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                {order.deliveryWorker && (
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Assigned Worker:
                    </span>{" "}
                    {order.deliveryWorker.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-700 mb-1">Items:</p>
                <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.quantity} — ${item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-700">Delivery Address:</p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.street}
                </p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.city}
                </p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.phone}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Total:</span> $
                  {order.totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-700">
                    Paid:
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full text-white font-medium ${
                      order.isPaid ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {order.isPaid
                      ? `Yes (${new Date(order.paidAt!).toLocaleDateString()})`
                      : "No"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-700">
                    Delivered:
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full text-white font-medium ${
                      order.isDelivered ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {order.isDelivered
                      ? `Yes (${new Date(
                          order.deliveredAt!
                        ).toLocaleDateString()})`
                      : "No"}
                  </span>
                </div>
              </div>

              {!order.deliveryWorker && (
                <>
                  <button
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      fetchWorkers();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Assign Delivery Worker
                  </button>

                  {selectedOrderId === order._id && (
                    <select
                      onChange={(e) => assignWorker(order._id, e.target.value)}
                      className="mt-2 block w-full border border-gray-300 rounded p-2"
                    >
                      <option value="">Select worker</option>
                      {workers.map((worker) => (
                        <option key={worker._id} value={worker._id}>
                          {worker.name}
                        </option>
                      ))}
                    </select>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
