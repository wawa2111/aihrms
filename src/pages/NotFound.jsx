import { Link, useLocation } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';

function NotFound() {
  const location = useLocation();
  const isPublicRoute = ['/features', '/pricing', '/demo', '/contact', '/about'].some(
    route => location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isPublicRoute && <LandingHeader />}
      
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="animate-bounce-slow">
            <h1 className="text-9xl font-extrabold text-accent">404</h1>
          </div>
          <div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Oops! Page Not Found
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link
              to="/"
              className="btn btn-primary py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Return Home
            </Link>
            
            {isPublicRoute ? (
              <Link 
                to="/contact" 
                className="btn btn-outline btn-accent py-3 px-6 rounded-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact Support
              </Link>
            ) : (
              <Link 
                to="/dashboard" 
                className="btn btn-outline btn-accent py-3 px-6 rounded-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Go to Dashboard
              </Link>
            )}
          </div>
          
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link to="/features" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">→</span> Features
              </Link>
              <Link to="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">→</span> Pricing
              </Link>
              <Link to="/demo" className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                <span className="mr-1">→</span> Request Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add animation for the bounce effect
import { useEffect } from 'react';
import '../styles/notfound.css';

export default NotFound;