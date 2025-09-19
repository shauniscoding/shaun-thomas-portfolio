import React from 'react';
import logo from '../src/assets/logo.png'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">

          {/* Logo section */}
          <div className="flex-shrink-0">
            <img 
                src={logo}   
                alt="Logo" 
                className="h-15 w-auto" 
            />
          </div>

          {/* Navigation links */}
          <div className="flex space-x-4">
            <a href="#home" className="text-white-600 hover:text-gray-400 px-3 py-2 text-lg font-medium transition-colors">
              Home
            </a>
            <a href="#about" className="text-white-600 hover:text-gray-400 px-3 py-2 text-lg font-medium transition-colors">
              Background
            </a>
            <a href="#services" className="text-white-600 hover:text-gray-400 px-3 py-2 text-lg font-medium transition-colors">
              Tools
            </a>
            <a href="#contact" className="text-white-600 hover:text-gray-400 px-3 py-2 text-lg font-medium transition-colors">
              Projects
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;