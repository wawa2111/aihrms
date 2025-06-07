/**
 * Utility functions for handling authentication redirects
 */

/**
 * Save the intended destination URL to redirect after authentication
 * @param {string} path - The path to redirect to after login/signup
 * @param {Object} options - Additional options for the redirect
 * @param {boolean} options.preserveQuery - Whether to preserve query parameters
 */
export const saveRedirectPath = (path, options = {}) => {
  if (!path || path.includes('/login') || path.includes('/register') || path.includes('/signup')) {
    return;
  }
  
  // Store both the path and any options
  const redirectData = {
    path,
    options
  };
  
  sessionStorage.setItem('auth_redirect_data', JSON.stringify(redirectData));
};

/**
 * Get the saved redirect path or return the default path
 * @param {string} defaultPath - Default path to return if no saved path exists
 * @param {Object} defaultOptions - Default options to use if no saved options exist
 * @returns {Object} Object containing the path and options
 */
export const getRedirectData = (defaultPath = '/dashboard', defaultOptions = {}) => {
  try {
    const savedData = sessionStorage.getItem('auth_redirect_data');
    sessionStorage.removeItem('auth_redirect_data');
    
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error parsing redirect data:', error);
  }
  
  return { path: defaultPath, options: defaultOptions };
};

/**
 * Get the saved redirect path or return the default path
 * @param {string} defaultPath - Default path to return if no saved path exists
 * @returns {string} The path to redirect to
 */
export const getRedirectPath = (defaultPath = '/dashboard') => {
  const { path } = getRedirectData(defaultPath);
  return path;
};

/**
 * Extract redirect path and options from URL query parameters
 * @param {string} search - URL search string
 * @returns {Object|null} Object containing path and options, or null if not found
 */
export const getRedirectFromQuery = (search) => {
  const params = new URLSearchParams(search);
  const redirect = params.get('redirect');
  const preserveQuery = params.get('preserveQuery') === 'true';
  
  if (!redirect) return null;
  
  return {
    path: decodeURIComponent(redirect),
    options: { preserveQuery }
  };
};

/**
 * Handles the redirect after successful authentication
 * @param {Object} navigate - React Router's navigate function
 * @param {string} defaultPath - Default path to redirect to
 * @param {Object} location - Current location object
 */
export const handleAuthRedirect = (navigate, defaultPath = '/dashboard', location) => {
  const { path, options } = getRedirectData(defaultPath);
  
  // If preserveQuery is true and we have a current location with query params
  if (options.preserveQuery && location && location.search) {
    const currentParams = new URLSearchParams(location.search);
    // Remove auth-specific params
    currentParams.delete('redirect');
    currentParams.delete('preserveQuery');
    
    const queryString = currentParams.toString();
    const redirectPath = queryString ? `${path}?${queryString}` : path;
    
    navigate(redirectPath);
    return;
  }
  
  navigate(path);
};