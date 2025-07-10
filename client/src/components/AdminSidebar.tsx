import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react";
import { useAuth } from "../hooks/useAuth"; 

const allNavLinks = [
  { label: "Products", path: "/admin/products" },
  { label: "Orders", path: "/admin/orders", restricted: true },
  { label: "Finance", path: "/admin/finance", restricted: true },
  { label: "Delivery", path: "/admin/delivery" },
  { label: "Users", path: "/admin/users", restricted: true },
];

export default function AdminNavbarLayout() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const { role } = useAuth(); // ✅ Get role

  const handleNavClick = () => {
    setShowMenu(false);
  };

  // ✅ Filter links based on role
  const navLinks = allNavLinks.filter(
    (link) => role === "admin" || !link.restricted
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-[rgb(49,42,49)] text-white flex justify-between items-center
       px-4 py-3 shadow-md relative z-50">
        <h1 className="text-xl font-semibold">Admin Panel</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center text-xs">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`hover:text-purple-400 transition ${
                location.pathname === path ? "text-purple-400" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Profile and Logout */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin/settings/profile"
              className="flex items-center gap-1 hover:text-purple-400 transition"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <SignOutButton redirectUrl="/">
              <button className="flex items-center gap-1 hover:text-red-400 transition">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-white focus:outline-none text-xl"
        >
          ☰
        </button>

        {/* Mobile Dropdown */}
        {showMenu && (
          <div className="absolute top-14 left-0 w-full bg-white text-black md:hidden z-50 shadow-md">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                onClick={handleNavClick}
                className={`block px-6 py-3 text-sm font-medium border-b hover:bg-gray-100 ${
                  location.pathname === path ? "bg-gray-100 text-purple-600" : ""
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Profile and Logout */}
            <div className="border-t px-6 py-3">
              <Link
                to="/admin/settings/profile"
                onClick={handleNavClick}
                className="block text-sm py-2 hover:text-purple-600"
              >
                Profile
              </Link>
              <SignOutButton redirectUrl="/">
                <button className="text-left text-sm text-red-600 py-2 hover:text-red-800 w-full">
                  Logout
                </button>
              </SignOutButton>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto text-sm">
        <Outlet />
      </main>
    </div>
  );
}
