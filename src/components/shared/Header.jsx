import { useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '@/hooks/useAuth';

function Header({ sidebarOpen, setSidebarOpen }) {
  const { user } = useSelector((state) => state.auth);
  const { logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-secondary shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <i className="fas fa-bars"></i>
          </button>
          
          {/* Logo (mobile) */}
          <div className="md:hidden flex items-center">
            <span className="text-xl font-bold text-accent">HRPBloom</span>
          </div>
          
          {/* Search */}
          <div className="hidden md:flex md:flex-1">
            <div className="max-w-lg w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-white"
            >
              <span className="sr-only">View notifications</span>
              <i className="fas fa-bell"></i>
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {user?.name ? (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user.name.charAt(0)}
                    </span>
                  ) : (
                    <i className="fas fa-user text-gray-400"></i>
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name || 'User'}
                </span>
              </button>
              
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a
                    href="#profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </a>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;