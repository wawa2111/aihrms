import React from 'react';
import FeaturesList from '../../components/shared/FeaturesList';

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Comprehensive HR Management Features
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          HRPBloom HRMS offers a complete suite of features to streamline your HR operations,
          enhance employee experience, and drive organizational growth.
        </p>
      </div>
      
      <FeaturesList />
      
      <div className="mt-16 text-center">
        <a 
          href="/signup" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Get Started Today
        </a>
      </div>
    </div>
  );
};

export default Features;