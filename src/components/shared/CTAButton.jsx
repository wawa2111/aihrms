import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CTAButton = ({ 
  text, 
  link, 
  icon, 
  variant = 'primary', 
  size = 'md',
  requiresUpgrade = false,
  onClick
}) => {
  const { user } = useSelector(state => state.authentication);
  const isPremium = user?.subscription?.plan === 'premium';
  
  const baseClasses = "flex items-center justify-center font-medium rounded-md transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
    premium: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
  };
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3"
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  // If feature requires upgrade and user is not premium
  if (requiresUpgrade && !isPremium) {
    return (
      <Link 
        to="/subscription" 
        className={`${baseClasses} ${variantClasses.premium} ${sizeClasses[size]}`}
      >
        <i className="fas fa-crown mr-2"></i>
        Upgrade to Access
      </Link>
    );
  }
  
  // Regular button or link
  if (link) {
    return (
      <Link to={link} className={buttonClasses}>
        {icon && <i className={`${icon} mr-2`}></i>}
        {text}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon && <i className={`${icon} mr-2`}></i>}
      {text}
    </button>
  );
};

export default CTAButton;