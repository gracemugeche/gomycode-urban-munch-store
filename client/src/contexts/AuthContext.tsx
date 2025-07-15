import { createContext, useState, useEffect, useCallback } from "react";
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
  error: string | null;
  logout: () => void;
  refetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  error: null,
  logout: () => {},
  refetchUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user: clerkUser, isSignedIn, isLoaded } = useUser();

  const syncAndFetchUser = useCallback(async () => {
    if (!isLoaded) return; // Wait for Clerk to load
    
    setError(null);
    
    if (isSignedIn && clerkUser) {
      // First, try to get role from Clerk's publicMetadata
      const roleFromClerk = (clerkUser.publicMetadata?.role as Role) || "user";
      
      // If backend URL is not configured, use Clerk data only
      if (!import.meta.env.VITE_API_BASE_URL) {
        console.warn("⚠️ Backend API URL not configured, using Clerk data only");
        const clerkOnlyUser: User = {
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || clerkUser.username || "User",
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          clerkId: clerkUser.id,
          role: roleFromClerk,
          imageUrl: clerkUser.imageUrl || "",
        };
        setUser(clerkOnlyUser);
        setRole(roleFromClerk);
        setLoading(false);
        return;
      }

      const payload = {
        id: clerkUser.id,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        imageUrl: clerkUser.imageUrl || "",
        role: roleFromClerk,
      };

      try {
        // Sync user with backend with timeout
        const syncPromise = axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/clerk`, payload, {
          timeout: 5000, // 5 second timeout
        });
        
        await syncPromise;
        console.log("✅ Synced Clerk user to backend");

        // Fetch the synced MongoDB user by Clerk ID
        const response = await axios.get<User>(
          `${import.meta.env.VITE_API_BASE_URL}/users/clerk/${clerkUser.id}`,
          { timeout: 5000 }
        );

        const mongoUser = response.data;
        setUser(mongoUser);
        setRole(mongoUser.role);
        localStorage.setItem("mongoUser", JSON.stringify(mongoUser));
      } catch (err) {
        console.error("❌ Failed to sync or fetch Mongo user:", err);
        setError("Failed to sync with backend. Using Clerk data.");
        
        // Fallback: Use Clerk data if backend fails
        const fallbackUser: User = {
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || clerkUser.username || "User",
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          clerkId: clerkUser.id,
          role: roleFromClerk,
          imageUrl: clerkUser.imageUrl || "",
        };
        setUser(fallbackUser);
        setRole(roleFromClerk);
      }
    } else {
      // User is signed out
      setUser(null);
      setRole(null);
      localStorage.removeItem("mongoUser");
    }

    setLoading(false);
  }, [isSignedIn, clerkUser, isLoaded]);

  useEffect(() => {
    syncAndFetchUser();
  }, [syncAndFetchUser]);

  const logout = () => {
    setUser(null);
    setRole(null);
    setError(null);
    localStorage.removeItem("mongoUser");
  };

  const refetchUser = async () => {
    setLoading(true);
    await syncAndFetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, error, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
