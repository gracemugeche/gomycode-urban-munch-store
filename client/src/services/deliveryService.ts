import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/delivery";

export interface DeliveryOrder {
  _id: string;
  deliveryAddress: {
    street: string;
    city: string;
    phone: string;
  };
  orderItems: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  deliveryStatus: "pending" | "in_progress" | "delivered" | "cancelled";
  note?: string;
}

export const getMyDeliveries = async (token: string) => {
  const res = await axios.get<DeliveryOrder[]>(`${API_URL}/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateDeliveryStatus = async (
  orderId: string,
  status: string,
  note: string,
  token: string
) => {
  const res = await axios.put(
    `${API_URL}/status/${orderId}`,
    { status, note },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
