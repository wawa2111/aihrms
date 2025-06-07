import React from 'react';
import { Link } from 'react-router-dom';
import CTAButton from '../CTAButton';

const ButtonBase = ({ 
  children,
  variant = 'primary',
  size = 'md',
  link,
  icon,
  onClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ariaLabel,
  type = 'button',
  requiresUpgrade = false,
  ...props
}) => {
  // If the button is meant to be a CTA, use the CTAButton component
  if (props.isCTA) {
    return (
      <CTAButton
        text={children}
        variant={variant}
        size={size}
        link={link}
        icon={icon}
        onClick={onClick}
        loading={loading}
        disabled={disabled}
        fullWidth={fullWidth}
        ariaLabel={ariaLabel}
        requiresUpgrade={requiresUpgrade}
      />
    );
  }

  // Base classes for regular buttons
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Button variants
  const variantClasses = {
    primary: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    link: 'bg-transparent text-blue-600 hover:text-blue-700 hover:underline p-0 focus:ring-0'
  };

  // Button sizes
  const sizeClasses = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
    xl: 'text-lg px-6 py-3'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${loading ? 'relative !text-transparent' : ''}
  `.replace(/\s+/g, ' ').trim();

  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  // If link is provided, render as Link component
  if (link) {
    return (
      <Link
        to={link}
        className={buttonClasses}
        aria-label={ariaLabel}
        {...props}
      >
        {icon && <i className={`${icon} mr-2`}></i>}
        {children}
        {loading && <LoadingSpinner />}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && <i className={`${icon} mr-2`}></i>}
      {children}
      {loading && <LoadingSpinner />}
    </button>
  );
};

export default ButtonBase;
