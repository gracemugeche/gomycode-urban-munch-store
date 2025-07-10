import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

type Role = "user" | "worker" | "admin";

type User = {
  name: string;
  email: string;
  clerkId: string;
  role: Role;
  imageUrl: string;
};

type AuthContextType = {
  user: User | null;
  role: Role | null;
  loading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  const { user: clerkUser, isSignedIn } = useUser();

  useEffect(() => {
    const syncAndFetchUser = async () => {
      if (isSignedIn && clerkUser) {
        const roleFromClerk = clerkUser.publicMetadata?.role?.toString().trim() || "user";

        const payload = {
          id: clerkUser.id,
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          imageUrl: clerkUser.imageUrl || "",
          role: roleFromClerk, // ✅ Send role to backend
        };

        try {
          // ✅ 1. Save or update Clerk user in MongoDB
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/clerk`, payload);
          console.log("✅ Synced Clerk user to backend");

          // ✅ 2. Fetch the synced MongoDB user by Clerk ID
          const response = await axios.get<User>(
            `${import.meta.env.VITE_API_BASE_URL}/users/clerk/${clerkUser.id}`
          );

          const mongoUser = response.data;
          setUser(mongoUser);
          setRole(mongoUser.role);
          localStorage.setItem("mongoUser", JSON.stringify(mongoUser));
        } catch (err) {
          console.error("❌ Failed to sync or fetch Mongo user:", err);
        }
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem("mongoUser");
      }

      setLoading(false);
    };

    syncAndFetchUser();
  }, [isSignedIn, clerkUser]);

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("mongoUser");
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
