import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">AI Science Project Stimulator</h2>
          <p className="text-sm text-gray-400">Empowering Learning through AI Experiments</p>
        </div>

        <div className="flex space-x-4">
          <a href="/about" className="text-gray-400 hover:text-white">About</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
          <a href="/privacy" className="text-gray-400 hover:text-white">Privacy</a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4">
        © {new Date().getFullYear()} AI Science Project Stimulator. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;