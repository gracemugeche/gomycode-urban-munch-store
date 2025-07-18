import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Groceries", path: "/groceries" },
  { name: "Meals", path: "/meals" },
  { name: "Drinks", path: "/drinks" },
];

const NavLinks = ({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) => {
  const baseClass = isMobile
    ? "block p-3 bg-white shadow-md rounded-md text-center text-sm font-medium hover:bg-purple-50 transition"
    : "";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const dashboardLink = user?.role === "user" ? "/dashboard" : "/adminDashboard";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <>
      {navLinks.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          onClick={onLinkClick}
          className={`${baseClass} hover:text-purple-600`}
        >
          {name}
        </NavLink>
      ))}

      <NavLink
        to="/help"
        onClick={onLinkClick}
        className={`${baseClass} text-lg`}
      >
        <FiHelpCircle />
      </NavLink>

      <NavLink
        to="/cart"
        onClick={onLinkClick}
        className={`${baseClass} text-lg text-purple-900`}
      >
        <FaShoppingCart />
      </NavLink>

      {token && (
        <div className={`${isMobile ? "" : "relative"}`} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-lg text-purple-900 hover:text-purple-600 flex items-center gap-1 p-3"
          >
            <FaUserCircle size={22} />
            <span className={`${isMobile ? "text-sm" : "hidden"}`}>Account</span>
          </button>

          {dropdownOpen && (
            <div
              className={`${
                isMobile
                  ? "bg-white rounded-md shadow-md p-2 mt-2 space-y-2"
                  : "absolute right-0 bg-white shadow-md rounded-md mt-2 w-44 z-50"
              }`}
            >
              <NavLink
                to={dashboardLink}
                onClick={() => {
                  setDropdownOpen(false);
                  onLinkClick?.();
                }}
                className="block px-4 py-2 rounded-md hover:bg-purple-50 text-sm text-gray-700"
              >
                My Dashboard
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  onLinkClick?.();
                }}
                className="block w-full text-left px-4 py-2 rounded-md hover:bg-purple-50 text-sm
                 text-red-600 border-t"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {!token && (
        <NavLink
          to="/login"
          onClick={onLinkClick}
          className={`${baseClass} text-lg`}
        >
          <FaUserCircle />
        </NavLink>
      )}
    </>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-50 shadow-md
     text-purple-800 font-[Poppins]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide text-purple-900"
        >
          <IoFastFood className="text-purple-800" size={26} />
          Urban Munch
        </NavLink>

        <div className="hidden md:flex space-x-6 items-center text-sm text-black font-medium">
          <NavLinks />
        </div>

        <button
          className="md:hidden text-purple-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-3 bg-purple-50">
          <NavLinks isMobile onLinkClick={() => setMenuOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
