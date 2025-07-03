import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Groceries", path: "/groceries" },
  { name: "Meals", path: "/meals" },
  { name: "Drinks", path: "/drinks" },
  { name: "About", path: "/#about" },
  { name: "FAQs", path: "/#faqs" },
];

const NavLinks = ({ isMobile }: { isMobile?: boolean }) => {
  const baseClass = isMobile ? "block" : "";
  const isLoggedIn = false; // Replace with actual auth check

  return (
    <>
      {navLinks.map(({ name, path }) => {
        const isAnchor = path.startsWith("#") || path.startsWith("/#");
        const href = path.includes("#") ? path.slice(path.indexOf("#")) : path;

        return isAnchor ? (
          <a
            key={name}
            href={href}
            className={`${baseClass} hover:text-purple-600 transition`}
          >
            {name}
          </a>
        ) : (
          <Link
            key={name}
            to={path}
            className={`${baseClass} hover:text-purple-600 transition`}
          >
            {name}
          </Link>
        );
      })}

      <Link
        to="/cart"
        className={`${baseClass} text-purple-900 hover:text-purple-600 transition text-lg`}
      >
        <FaShoppingCart />
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/profile" className={`${baseClass} hover:text-purple-600`}>
            Profile
          </Link>
          <button className={`${baseClass} hover:text-purple-600`}>
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className={`${baseClass} hover:text-purple-600 text-lg`}
        >
          <FaUserCircle />
        </Link>
      )}
    </>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-50 shadow-md text-purple-800 font-[Poppins]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide text-purple-900 transition-all duration-300"
        >
          <IoFastFood className="text-purple-800" size={26} />
          Urban Munch
        </Link>

        <div className="hidden md:flex space-x-6 items-center text-sm text-black font-medium">
          <NavLinks />
        </div>

        <button
          className="md:hidden text-purple-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
        <div className="md:hidden px-6 pb-4 space-y-2 text-sm font-medium">
          <NavLinks isMobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
