import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "@clerk/clerk-react";
import type { PropsWithChildren } from "react";

type RoleRouteProps = PropsWithChildren<{
  allowedRoles: ("admin" | "worker" | "user")[];
  redirectTo?: string;
}>;

const RoleRoute = ({ children, allowedRoles, redirectTo = "/" }: RoleRouteProps) => {
  const { role, loading, error } = useAuth();
  const { isSignedIn, isLoaded } = useUser();

  // Wait for both Clerk and our auth context to load
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  // If user is not signed in, redirect to home
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // If there's an error but user is signed in, show error with fallback access
  if (error) {
    console.warn("Auth error, but proceeding with basic access:", error);
  }

  // Check role access
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
