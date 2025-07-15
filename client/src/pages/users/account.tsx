import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPen } from "react-icons/fa";

interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [editingField, setEditingField] = useState<"name" | "phone" | "address" | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get<User>(
          `${import.meta.env.VITE_API_BASE_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

  const handleSave = async () => {
    if (!user || !editingField) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch<{ user: User }>(
        `${import.meta.env.VITE_API_BASE_URL}/users/me`,
        { [editingField]: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setEditingField(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!user) return <p className="text-center py-20">Please log in to view your account.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-8 font-[Poppins]">
      <h2 className="text-2xl font-semibold text-slate-800 text-center">Account Details</h2>

      {/* Name */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <FaUser className="text-purple-600" />
          <div>
            <p className="text-xs text-slate-500">Name</p>
            <p className="font-medium text-slate-800">{user.name}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingField("name");
            setInputValue(user.name);
          }}
          className="text-purple-600"
        >
          <FaPen />
        </button>
      </div>

      {/* Email */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-purple-600" />
          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p className="font-medium text-slate-800">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <FaPhone className="text-purple-600" />
          <div>
            <p className="text-xs text-slate-500">Phone</p>
            <p className="font-medium text-slate-800">
              {user.phone || <span className="text-purple-500 text-sm">Add phone number</span>}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingField("phone");
            setInputValue(user.phone || "");
          }}
          className="text-purple-600"
        >
          <FaPen />
        </button>
      </div>

      {/* Address */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-purple-600" />
          <div>
            <p className="text-xs text-slate-500">Address</p>
            <p className="font-medium text-slate-800">
              {user.address || <span className="text-purple-500 text-sm">Add address</span>}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingField("address");
            setInputValue(user.address || "");
          }}
          className="text-purple-600"
        >
          <FaPen />
        </button>
      </div>

      {/* Edit Input Section */}
      {editingField && (
        <div className="space-y-3 pt-4">
          <input
            type="text"
            className="border border-slate-300 rounded px-3 py-2 w-full"
            placeholder={`Update ${editingField}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-purple-600 text-white py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="flex-1 border border-slate-300 py-2 rounded text-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
