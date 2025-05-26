import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-9xl font-extrabold text-accent">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div>
          <Link
            to="/"
            className="btn btn-primary"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;