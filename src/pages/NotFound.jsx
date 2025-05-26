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
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <h1 className="text-9xl font-extrabold text-accent">404</h1>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Page Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The page you are looking for doesn't exist or is still under development.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="btn btn-primary"
            >
              Go back home
            </Link>
            {isPublicRoute ? (
              <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                Contact us for assistance
              </Link>
            ) : (
              <Link to="/dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
                Return to dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;