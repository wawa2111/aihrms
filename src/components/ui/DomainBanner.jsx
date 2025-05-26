import { useState } from 'react';

function DomainBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <i className="fas fa-globe text-blue-200 mr-2"></i>
          <p className="text-sm">
            <span className="font-medium">Now live at </span>
            <a 
              href="https://hrpbloom.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-200"
            >
              hrpbloom.com
            </a>
            <span> and </span>
            <a 
              href="https://aihrms.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-200"
            >
              aihrms.vercel.app
            </a>
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-blue-200 hover:text-white mt-2 sm:mt-0"
          aria-label="Close banner"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export default DomainBanner;