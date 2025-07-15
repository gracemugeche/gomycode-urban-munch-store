import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "@clerk/clerk-react";

const RedirectAfterLogin = () => {
  const { role, loading, error } = useAuth();
  const { user: clerkUser, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || loading) return; // Wait for both to load

    // If there's an error, but we have Clerk user data, try to use Clerk role as fallback
    let userRole = role;
    if (error && clerkUser?.publicMetadata?.role) {
      userRole = clerkUser.publicMetadata.role as "admin" | "worker" | "user";
      console.warn("Using Clerk role as fallback due to auth error");
    }

    if (userRole === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (userRole === "worker") {
      navigate("/admin/dashboard", { replace: true });
    } else if (userRole === "user") {
      navigate("/dashboard", { replace: true });
    } else {
      // Fallback to home if no role is determined
      navigate("/", { replace: true });
    }
  }, [role, loading, error, navigate, clerkUser, isLoaded]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
        {error && (
          <p className="text-sm text-amber-600 mt-2">
            Note: Using fallback authentication
          </p>
        )}
      </div>
    </div>
  );
};

export default RedirectAfterLogin;
