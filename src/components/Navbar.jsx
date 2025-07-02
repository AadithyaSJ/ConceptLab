import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { HashLink } from "react-router-hash-link";

const Navbar = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = user
    ? [
        { name: "Dashboard", path: "/dashboard", isHash: false },
        { name: "Laws", path: "/laws", isHash: false },
      ]
    : [
        { name: "Home", path: "/", isHash: false },
        { name: "Features", path: "/#features", isHash: true },
        { name: "Contact", path: "/#contact", isHash: true },
      ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] z-50 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src="/logo.png" alt="ConceptLab Logo" className="w-[20px]" />
        </Link>
        <Link to="/">
          <span className="hidden sm:block text-white font-semibold text-lg tracking-wide font-[Audiowide]">
            ConceptLab
          </span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 text-sm text-white font-medium items-center">
        {navLinks.map(({ name, path, isHash }) => (
          <li key={name} className="cursor-pointer relative group">
            {isHash ? (
              <HashLink
                smooth
                to={path}
                className={({ isActive }) =>
                  `transition duration-300 group-hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                {name}
              </HashLink>
            ) : (
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `transition duration-300 group-hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            )}
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}
        <li>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 transition duration-300"
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white text-2xl focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-16 right-4 w-52 rounded-xl px-4 py-3 flex flex-col gap-3 text-sm font-medium z-50
            bg-white/5 text-white shadow-xl border border-white/20 backdrop-blur-[12px] md:hidden"
        >
          {navLinks.map(({ name, path, isHash }) => (
            <div key={name}>
              {isHash ? (
                <HashLink
                  smooth
                  to={path}
                  className="block hover:text-yellow-400 transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {name}
                </HashLink>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block hover:text-yellow-400 transition duration-300 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {name}
                </NavLink>
              )}
            </div>
          ))}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
