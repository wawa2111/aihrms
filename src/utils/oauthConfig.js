/**
 * OAuth configuration and utility functions
 */

// OAuth provider configurations
export const oauthProviders = {
  google: {
    name: 'Google',
    authUrl: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || '/api/auth/google',
    icon: 'google.svg',
    iconClass: 'fab fa-google',
    buttonBgColor: 'bg-white hover:bg-gray-50',
    buttonTextColor: 'text-gray-700',
    brandColor: '#4285F4'
  },
  linkedin: {
    name: 'LinkedIn',
    authUrl: process.env.NEXT_PUBLIC_LINKEDIN_AUTH_URL || '/api/auth/linkedin',
    icon: 'linkedin.svg',
    iconClass: 'fab fa-linkedin-in',
    buttonBgColor: 'bg-[#0A66C2] hover:bg-[#004182]',
    buttonTextColor: 'text-white',
    brandColor: '#0A66C2'
  },
  facebook: {
    name: 'Facebook',
    authUrl: process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL || '/api/auth/facebook',
    icon: 'facebook.svg',
    iconClass: 'fab fa-facebook-f',
    buttonBgColor: 'bg-[#1877F2] hover:bg-[#0C63D4]',
    buttonTextColor: 'text-white',
    brandColor: '#1877F2'
  }
};

/**
 * Handles OAuth login/signup redirect
 * @param {string} provider - The OAuth provider (google, linkedin, facebook)
 * @param {string} redirectPath - Path to redirect after successful auth
 * @param {Object} options - Additional options for the redirect
 */
export const handleOAuthRedirect = (provider, redirectPath, options = {}) => {
  const providerConfig = oauthProviders[provider.toLowerCase()];
  
  if (!providerConfig) {
    console.error(`Invalid OAuth provider: ${provider}`);
    return;
  }

  // Save redirect path for after authentication
  if (typeof window !== 'undefined') {
    const state = btoa(JSON.stringify({
      redirectPath,
      ...options
    }));
    
    sessionStorage.setItem('oauth_state', state);
    
    // Construct OAuth URL with state parameter
    const authUrl = new URL(providerConfig.authUrl, window.location.origin);
    authUrl.searchParams.append('state', state);
    
    // Redirect to OAuth provider
    window.location.href = authUrl.toString();
  }
};

/**
 * Get OAuth provider configuration
 * @param {string} provider - The OAuth provider name
 * @returns {Object} Provider configuration object
 */
export const getProviderConfig = (provider) => {
  return oauthProviders[provider.toLowerCase()];
};
