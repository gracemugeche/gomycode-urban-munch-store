import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Role = "user" | "worker" | "admin";

type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  imageUrl?: string;
};

type AuthContextType = {
  user: User | null;
  role: Role | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(parsedUser.role);
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  type LoginResponse = {
    token: string;
    user: User;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password }
      );

      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setRole(userData.role);

      if (userData.role === "admin" || userData.role === "worker") {
        navigate("/adminDashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      throw err;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      await login(email, password);
    } catch (err) {
      console.error("❌ Signup failed:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, signup, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
