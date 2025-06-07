import React from 'react';

function AccessibilityFeatures() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Key Accessibility Features
      </h2>
      
      <ul className="space-y-6">
        <li>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
              <i className="fas fa-keyboard text-blue-600 dark:text-blue-400 text-sm" aria-hidden="true"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Keyboard Navigation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full keyboard accessibility with visible focus indicators and logical tab order
              </p>
            </div>
          </div>
        </li>
        
        <li>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
              <i className="fas fa-audio-description text-blue-600 dark:text-blue-400 text-sm" aria-hidden="true"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Screen Reader Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                ARIA attributes and semantic HTML for screen reader compatibility
              </p>
            </div>
          </div>
        </li>
        
        <li>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
              <i className="fas fa-adjust text-blue-600 dark:text-blue-400 text-sm" aria-hidden="true"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Color Contrast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                High contrast mode and color combinations that meet WCAG AA standards
              </p>
            </div>
          </div>
        </li>
        
        <li>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
              <i className="fas fa-text-height text-blue-600 dark:text-blue-400 text-sm" aria-hidden="true"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Text Scaling</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All text scales up to 200% without loss of content or functionality
              </p>
            </div>
          </div>
        </li>
        
        <li>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
              <i className="fas fa-universal-access text-blue-600 dark:text-blue-400 text-sm" aria-hidden="true"></i>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900 dark:text-white">WCAG 2.1 AA Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AccessibilityFeatures;