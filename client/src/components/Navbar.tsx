import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
} from "@clerk/clerk-react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Groceries", path: "/groceries" },
  { name: "Meals", path: "/meals" },
  { name: "Drinks", path: "/drinks" },
];

const NavLinks = ({ isMobile }: { isMobile?: boolean }) => {
  const baseClass = isMobile ? "block" : "";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openUserProfile, signOut } = useClerk();

  // Close dropdown on outside click
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

  return (
    <>
      {navLinks.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          className={`${baseClass} hover:text-purple-600 transition`}
        >
          {name}
        </NavLink>
      ))}

      <NavLink
        to="/help"
        className={`${baseClass} hover:text-purple-600 transition text-lg`}
      >
        <FiHelpCircle />
      </NavLink>

      {/* Cart is always visible */}
      <NavLink
        to="/cart"
        className={`${baseClass} text-purple-900 hover:text-purple-600 transition text-lg`}
      >
        <FaShoppingCart />
      </NavLink>

      <SignedIn>
        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-lg text-purple-900 hover:text-purple-600"
          >
            <FaUserCircle size={22} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 bg-white shadow-md border rounded-md mt-2 w-44 z-50">
              <NavLink
                to="/dashboard"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-purple-100 text-sm text-gray-700"
              >
                My Dashboard
              </NavLink>
              <button
                onClick={() => {
                  openUserProfile();
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-100 text-sm text-gray-700"
              >
                Manage My Account
              </button>
              <button
                onClick={() => {
                  signOut();
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-100 text-sm text-red-600 border-t"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button className={`${baseClass} hover:text-purple-600 text-lg`}>
            <FaUserCircle />
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="bg-gradient-to-r from-purple-200 via-purple-100 to-purple-50 shadow-md 
      text-purple-800 font-[Poppins]"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide text-purple-900 transition-all duration-300"
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
              d={
                menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
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
