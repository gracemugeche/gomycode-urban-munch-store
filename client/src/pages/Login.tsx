import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "worker" | "admin";
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-purple-600 text-center">Urban Munch Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl py-3 transition"
        >
          Login
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
