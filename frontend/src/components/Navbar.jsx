import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] z-50 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl px-6 py-3 flex justify-between items-center">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src="/logo.png" alt="ConceptLab Logo" className="w-[20px] md:w-[20px]" />
        </Link>
        <Link to="/">
          <span className="hidden sm:block text-white font-semibold text-lg tracking-wide font-[Audiowide]">
            ConceptLab
          </span>
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8 text-sm text-white font-medium items-center">
        {[
          { name: "Home", path: "/" },
          { name: "Features", path: "/#features" }, // Adjust based on your route
          { name: "Laws", path: "/laws" },
        ].map(({ name, path }) => (
          <li key={name} className="cursor-pointer relative group">
            <NavLink
              to={path}
              className="group-hover:text-yellow-400 transition duration-300"
            >
              {name}
            </NavLink>
            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}

        {/* Login as a button */}
        <li>
          <NavLink
            to="/login"
            className="bg-yellow-400 text-black px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 transition duration-300"
          >
            Login
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <button className="md:hidden text-white text-2xl focus:outline-none">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
