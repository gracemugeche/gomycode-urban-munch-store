import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/users";

export interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: "user" | "worker" | "admin";
  createdAt: string;
  orderCount: number;
  isActive: boolean;
}

export const fetchUsersWithStats = async (token: string): Promise<User[]> => {
  const res = await axios.get<User[]>(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserRole = async (userId: string, role: User["role"], token: string) => {
  const res = await axios.put(
    `${API_URL}/update-role`,
    { userId, role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const toggleUserStatus = async (userId: string, isActive: boolean, token: string) => {
  const res = await axios.put(
    `${API_URL}/${userId}/status`,
    { isActive },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteUser = async (userId: string, token: string) => {
  const res = await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
