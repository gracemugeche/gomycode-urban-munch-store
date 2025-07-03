import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; 

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth(); 

  useEffect(() => {
    if (!token || !user?.isAdmin) {
      navigate("/admin/login");
    }
  }, [token, user, navigate]);

  return (
    <div className="p-6">
      <nav className="mb-4 space-x-4">
        <a href="/admin/products" className="text-blue-500">Products</a>
        <a href="/admin/orders" className="text-blue-500">Orders</a>
        <a href="/admin/users" className="text-blue-500">Users</a>
      </nav>
      {children}
    </div>
  );
};

export default AdminLayout;
