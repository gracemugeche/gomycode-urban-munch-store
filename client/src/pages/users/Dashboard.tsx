import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaUserCircle } from "react-icons/fa";

interface UserResponse {
  name?: string; 
  email: string;
  avatar?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get<UserResponse>(
          `${import.meta.env.VITE_API_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!user)
    return (
      <p className="text-center py-20">Please log in to view your dashboard.</p>
    );

  const firstName = user.name?.split(" ")[0] || "User";
  const initials = user.name?.split(" ")[0]?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center font-[Poppins]">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center
         text-white text-2xl font-bold mb-3">
          {initials}
        </div>
        <h2 className="text-xl font-semibold text-slate-800">
          Welcome, {firstName}
        </h2>
      </div>

      <div className="flex gap-4 w-full max-w-md mt-10">
        <button
          onClick={() => navigate("/orders")}
          className="flex-1 bg-white rounded-xl p-5 shadow flex flex-col items-center 
          transition hover:scale-105"
        >
          <FaClipboardList size={40} className="text-purple-600 mb-2" />
          <span className="text-slate-700 font-medium">Orders</span>
        </button>

        <button
          onClick={() => navigate("/account")}
          className="flex-1 bg-white rounded-xl p-5 shadow flex flex-col items-center transition hover:scale-105"
        >
          <FaUserCircle size={40} className="text-purple-600 mb-2" />
          <span className="text-slate-700 font-medium">Account</span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto w-full max-w-md text-center text-red-600 text-sm border-t pt-6 pb-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
