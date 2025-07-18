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
  deliveryStatus: "pending" | "in_progress" | "delivered" | "failed";
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
  deliveryStatus: "pending" | "in_progress" | "delivered" | "failed",
  token: string
) => {
  const res = await axios.put(
    `${API_URL}/${orderId}/status`,  
    { status: deliveryStatus },      
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
