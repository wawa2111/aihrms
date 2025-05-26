import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Protected route component that redirects to login if not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string[]} [props.allowedRoles] - Optional roles that are allowed to access this route
 */
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if specified)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role
  return children;
}

export default ProtectedRoute;