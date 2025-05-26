import { useState } from 'react';
import { Link } from 'react-router-dom';

function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white text-emerald-600 rounded-full p-1 mr-3">
            <i className="fas fa-percentage text-sm"></i>
          </div>
          <p className="text-sm md:text-base">
            <span className="font-bold">Special Offer:</span> Get 30% off on all plans for the first 3 months. Limited time offer!
          </p>
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <Link 
            to="/pricing" 
            className="bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-1 rounded-full text-sm font-medium mr-3"
          >
            Get Discount
          </Link>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-emerald-100"
            aria-label="Close banner"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;