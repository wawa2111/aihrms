import { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/hrpbloom.png" 
                alt="HRPBloom Logo" 
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">HRPBloom</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/features" 
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Pricing
              </Link>
              <Link 
                to="/about" 
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/features" 
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;