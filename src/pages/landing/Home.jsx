import React from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '../../components/ui/LandingHeader';
import FeaturesList from '../../components/shared/FeaturesList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI-Powered HR Management System
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Streamline your HR operations with our comprehensive HRMS platform featuring AI-driven insights and automation.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/signup" 
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 text-center"
                >
                  Get Started
                </Link>
                <Link 
                  to="/demo" 
                  className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center"
                >
                  Request Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/hrpbloom.png" 
                alt="HRPBloom Dashboard" 
                className="max-w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive HR management system offers everything you need to streamline your HR operations.
            </p>
          </div>
          
          <FeaturesList compact={true} />
          
          <div className="mt-12 text-center">
            <Link 
              to="/features" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
            >
              View All Features
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of companies that have streamlined their HR processes with HRPBloom HRMS.
          </p>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img 
                src="/hrpbloom.png" 
                alt="HRPBloom Logo" 
                className="h-10 w-auto mb-4"
              />
              <p className="max-w-xs">
                AI-powered HR management system for modern businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link to="/features" className="hover:text-white">Features</Link></li>
                  <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                  <li><Link to="/demo" className="hover:text-white">Request Demo</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} HRPBloom. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;