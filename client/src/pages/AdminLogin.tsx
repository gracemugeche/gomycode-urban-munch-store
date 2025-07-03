import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Updated expected response from backend
interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin345");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // from context

  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );

      const { token, user } = response.data;

      if (!user.isAdmin) {
        setError("Not authorized as admin");
        return;
      }

      login(user, token); // ✅ Save full user and token to context
      navigate("/admin/dashboard"); // ✅ Redirect to admin dashboard
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-purple-700">Admin Login</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Admin Email"
        className="border p-2 w-full rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleLogin}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
