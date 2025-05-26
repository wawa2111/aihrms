import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

// Navigation items
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'fas fa-tachometer-alt' },
  { name: 'Employees', href: '/employees', icon: 'fas fa-users' },
  { name: 'Attendance', href: '/attendance', icon: 'fas fa-clipboard-check' },
  { name: 'Leave', href: '/leave', icon: 'fas fa-calendar-alt' },
  { name: 'Analytics', href: '/analytics', icon: 'fas fa-chart-bar' },
  { name: 'Settings', href: '/settings', icon: 'fas fa-cog' },
];

// Admin navigation items
const adminNavigation = [
  { name: 'HR Assistant', href: '/hr-assistant', icon: 'fas fa-robot' },
  { name: 'Departments', href: '/departments', icon: 'fas fa-building' },
  { name: 'Roles', href: '/roles', icon: 'fas fa-user-tag' },
];

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  const isAdmin = user?.role === 'admin' || user?.role === 'hr';
  
  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-secondary">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <i className="fas fa-times text-white"></i>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="text-2xl font-bold text-accent">HRPBloom</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        group flex items-center px-2 py-2 text-base font-medium rounded-md
                        ${
                          location.pathname === item.href
                            ? 'bg-accent text-white'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      <i className={`${item.icon} mr-4 ${location.pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`}></i>
                      {item.name}
                    </Link>
                  ))}
                  
                  {isAdmin && (
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Admin
                      </h3>
                      <div className="mt-2 space-y-1">
                        {adminNavigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`
                              group flex items-center px-2 py-2 text-base font-medium rounded-md
                              ${
                                location.pathname === item.href
                                  ? 'bg-accent text-white'
                                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                              }
                            `}
                          >
                            <i className={`${item.icon} mr-4 ${location.pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`}></i>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-secondary border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-accent">HRPBloom</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${
                      location.pathname === item.href
                        ? 'bg-accent text-white'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <i className={`${item.icon} mr-3 ${location.pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`}></i>
                  {item.name}
                </Link>
              ))}
              
              {isAdmin && (
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Admin
                  </h3>
                  <div className="mt-2 space-y-1">
                    {adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`
                          group flex items-center px-2 py-2 text-sm font-medium rounded-md
                          ${
                            location.pathname === item.href
                              ? 'bg-accent text-white'
                              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <i className={`${item.icon} mr-3 ${location.pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'}`}></i>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;