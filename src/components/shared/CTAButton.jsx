import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CTAButton = ({ 
  text, 
  link, 
  icon, 
  variant = 'primary', 
  size = 'md',
  requiresUpgrade = false,
  onClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  ariaLabel
}) => {
  const { user } = useSelector(state => state.authentication);
  const isPremium = user?.subscription?.plan === 'premium';
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = `
    flex items-center justify-center 
    font-medium rounded-md 
    transition-all duration-300 
    transform focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;
  
  const variantClasses = {
    primary: `
      bg-blue-600 text-white 
      hover:bg-blue-700 hover:scale-[1.02]
      focus:ring-blue-500
      active:bg-blue-800
      disabled:bg-blue-400
    `,
    secondary: `
      bg-gray-200 text-gray-800 
      hover:bg-gray-300 hover:scale-[1.02]
      focus:ring-gray-500
      active:bg-gray-400
      disabled:bg-gray-100
    `,
    success: `
      bg-green-600 text-white 
      hover:bg-green-700 hover:scale-[1.02]
      focus:ring-green-500
      active:bg-green-800
      disabled:bg-green-400
    `,
    danger: `
      bg-red-600 text-white 
      hover:bg-red-700 hover:scale-[1.02]
      focus:ring-red-500
      active:bg-red-800
      disabled:bg-red-400
    `,
    outline: `
      bg-transparent border-2 border-blue-600 text-blue-600 
      hover:bg-blue-50 hover:scale-[1.02]
      focus:ring-blue-500
      active:bg-blue-100
      disabled:border-blue-300 disabled:text-blue-300
    `,
    premium: `
      bg-gradient-to-r from-purple-600 to-indigo-600 text-white
      hover:from-purple-700 hover:to-indigo-700 hover:scale-[1.02]
      focus:ring-purple-500
      active:from-purple-800 active:to-indigo-800
      disabled:from-purple-400 disabled:to-indigo-400
    `
  };
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 min-w-[4rem]",
    md: "text-sm px-4 py-2 min-w-[6rem]",
    lg: "text-base px-6 py-3 min-w-[8rem]"
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]}
    ${loading ? 'relative !text-transparent' : ''}
  `.replace(/\s+/g, ' ').trim();
  
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  // If feature requires upgrade and user is not premium
  if (requiresUpgrade && !isPremium) {
    return (
      <Link 
        to="/subscription" 
        className={`${baseClasses} ${variantClasses.premium} ${sizeClasses[size]}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Upgrade to access this feature"
      >
        <i className={`fas fa-crown mr-2 ${isHovered ? 'animate-bounce' : ''}`}></i>
        Upgrade to Access
      </Link>
    );
  }
  
  // Regular button or link
  if (link) {
    return (
      <Link 
        to={link} 
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={ariaLabel || text}
      >
        {icon && <i className={`${icon} mr-2 ${isHovered ? 'animate-pulse' : ''}`}></i>}
        {text}
        {loading && <LoadingSpinner />}
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      className={buttonClasses}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel || text}
    >
      {icon && <i className={`${icon} mr-2 ${isHovered ? 'animate-pulse' : ''}`}></i>}
      {text}
      {loading && <LoadingSpinner />}
    </button>
  );
};

export default CTAButton;
