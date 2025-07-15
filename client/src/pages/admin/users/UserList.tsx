import { useEffect, useState } from "react";
import {
  fetchUsersWithStats,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
} from "../../../services/userService";
import type { User } from "../../../services/userService";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await fetchUsersWithStats(token);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (
    userId: string,
    role: "user" | "worker" | "admin"
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await updateUserRole(userId, role, token);
    fetchUsers();
  };

  const handleToggleStatus = async (userId: string, isActive: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await toggleUserStatus(userId, !isActive, token);
    fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteUser(userId, token);
      fetchUsers();
    }
  };

  const userList = users.filter((u) => u.role === "user");
  const workerList = users.filter((u) => u.role === "worker");

  if (loading)
    return <p className="text-center mt-10 text-purple-700 font-semibold">Loading users...</p>;

  const renderUserCard = (user: User, promoteTo: "worker" | "admin") => (
    <div
      key={user._id}
      className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4"
    >
      <img
        src={user.imageUrl || "/default-avatar.png"}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1 text-center sm:text-left">
        <p className="text-lg font-bold text-gray-800">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-xs text-gray-400 mt-1">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400">Orders: {user.orderCount}</p>
      </div>
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <button
          onClick={() => handleRoleChange(user._id, promoteTo)}
          className="border border-gray-300 text-sm text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          Promote to {promoteTo.charAt(0).toUpperCase() + promoteTo.slice(1)}
        </button>
        <button
          onClick={() => handleToggleStatus(user._id, user.isActive)}
          className="text-sm text-gray-500 hover:underline"
        >
          {user.isActive ? "Disable" : "Enable"}
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Users</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {userList.map((user) => renderUserCard(user, "worker"))}
        </div>
      </div>

      <hr className="my-8 border-t-2 border-purple-200" />

      <div>
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Workers</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {workerList.map((user) => renderUserCard(user, "admin"))}
        </div>
      </div>
    </div>
  );
}
