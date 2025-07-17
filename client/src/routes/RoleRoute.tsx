import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface RoleRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const RoleRoute = ({ allowedRoles, children }: RoleRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin" || user.role === "worker") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleRoute;
