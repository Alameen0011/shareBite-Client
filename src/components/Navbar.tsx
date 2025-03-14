import  { useState } from 'react';
import { HandPlatter as Plate, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Plate className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">ShareBite</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              About
            </Link>
            <Link to="/donate" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              Donate
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
              Contact
            </Link>
            <button className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                About
              </a>
              <a
                href="/donate"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Donate
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              >
                Contact
              </a>
              <button className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;