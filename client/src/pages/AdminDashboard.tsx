import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 font-[Poppins]">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage products, orders, and users here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-purple-100 p-4 rounded-xl shadow block hover:bg-purple-200">
          <h2 className="text-lg font-semibold">Products</h2>
          <p>View, add, update, or delete products.</p>
        </Link>
        <Link to="/admin/orders" className="bg-purple-100 p-4 rounded-xl shadow block hover:bg-purple-200">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p>Track and manage customer orders.</p>
        </Link>
        <Link to="/admin/users" className="bg-purple-100 p-4 rounded-xl shadow block hover:bg-purple-200">
          <h2 className="text-lg font-semibold">Users</h2>
          <p>View user accounts and permissions.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
