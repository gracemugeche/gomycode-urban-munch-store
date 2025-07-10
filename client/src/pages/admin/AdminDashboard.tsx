import { Link } from "react-router-dom";
import { Package, FileText, Truck, Users, LogOut, Wallet } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user, role } = useAuth();

  const sections = [
    {
      name: "Products",
      icon: <Package className="h-10 w-10 text-purple-600" />,
      to: "/admin/products",
    },
    {
      name: "Orders",
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      to: "/admin/orders",
      restricted: true,
    },
    {
      name: "Delivery",
      icon: <Truck className="h-10 w-10 text-purple-600" />,
      to: "/admin/delivery",
    },
    {
      name: "Finance",
      icon: <Wallet className="h-10 w-10 text-purple-600" />,
      to: "/admin/finance",
      restricted: true,
    },
    {
      name: "Users",
      icon: <Users className="h-10 w-10 text-purple-600" />,
      to: "/admin/users",
      restricted: true,
    },
  ];

  const visibleSections = sections.filter(
    (s) => role === "admin" || !s.restricted
  );

  const topSections = visibleSections.slice(0, 4);
  const lastSection = visibleSections.length > 4 ? visibleSections[4] : null;

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-[Poppins]">
      {/* Profile */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-purple-400 text-white rounded-full h-16 w-16 flex items-center 
          justify-center text-2xl font-bold shadow-md">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.name || "Admin"}
            </h1>
            <p className="text-gray-500 capitalize">{role} Panel</p>
          </div>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {topSections.map((section) => (
          <Link
            key={section.name}
            to={section.to}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl
             shadow hover:shadow-md transition"
          >
            {section.icon}
            <p className="mt-3 font-semibold text-gray-700 text-lg">
              {section.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Centered Last Card if odd */}
      {lastSection && (
        <div className="flex justify-center mb-10">
          <Link
            to={lastSection.to}
            className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl
             shadow hover:shadow-md transition w-full sm:w-80"
          >
            {lastSection.icon}
            <p className="mt-3 font-semibold text-gray-700 text-lg">
              {lastSection.name}
            </p>
          </Link>
        </div>
      )}

      {/* Logout Button (optional to wire with Clerk logout) */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-red-600 px-5 py-2 rounded hover:underline">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
