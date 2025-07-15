import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-purple-600 text-center">Urban Munch Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Signup
        </button>
        <p className="text-center text-sm">
          Already have an account? <a href="/login" className="text-purple-600">Login</a>
        </p>
      </form>
    </div>
  );
}
