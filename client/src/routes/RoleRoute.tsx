import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { PropsWithChildren } from "react";

type RoleRouteProps = PropsWithChildren<{
  allowedRoles: ("admin" | "worker" | "user")[];
  redirectTo?: string;
}>;

const RoleRoute = ({ children, allowedRoles, redirectTo = "/" }: RoleRouteProps) => {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
