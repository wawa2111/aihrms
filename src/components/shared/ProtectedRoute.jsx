import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveRedirectPath } from '../../utils/authRedirect';

/**
 * Protected route component that redirects to login if not authenticated
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {string[]} [props.allowedRoles] - Optional roles that are allowed to access this route
 */
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Save the current path for redirect after login
    saveRedirectPath(location.pathname + location.search);
    
    // Redirect to login with the current location in the redirect parameter
    return <Navigate 
      to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} 
      replace 
    />;
  }

  // Check if user has required role (if specified)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role
  return children;
}

export default ProtectedRoute;