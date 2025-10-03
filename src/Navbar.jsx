import React, { useState } from 'react';
import logo from '../src/assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/70 backdrop-blur-md shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-23">
          
          {/* Logo section */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={logo}   
              alt="Logo" 
              className="h-14 w-auto rounded-lg shadow-md hover:scale-105 transition-transform"
            />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-10">
            {['About', 'Experience', 'Skills', 'Projects'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-white font-semibold text-xl group tracking-wide"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md shadow-lg">
          <div className="flex flex-col items-center space-y-6 py-8">
            {['About', 'Experience', 'Skills', 'Projects'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-white text-xl font-medium hover:text-green-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
