import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                  to="/login" 
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 text-center"
                >
                  Get Started
                </Link>
                <Link 
                  to="/features" 
                  className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center"
                >
                  View Features
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                <div className="text-blue-500 mb-4">
                  <i className={`fas ${feature.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
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
            to="/login" 
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Get Started Today
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
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const features = [
  {
    title: "Employee Management",
    description: "Comprehensive employee profiles and records management",
    icon: "fa-user-tie"
  },
  {
    title: "Attendance Tracking",
    description: "QR Code-based check-in/check-out system",
    icon: "fa-qrcode"
  },
  {
    title: "Leave Management",
    description: "AI-powered substitute assignments and tracking",
    icon: "fa-calendar-alt"
  },
  {
    title: "Payroll Management",
    description: "Automated salary calculations and payslips",
    icon: "fa-money-bill-wave"
  },
  {
    title: "Performance Management",
    description: "Goal setting, reviews, and evaluations",
    icon: "fa-chart-line"
  },
  {
    title: "Analytics & Reports",
    description: "Comprehensive dashboards and insights",
    icon: "fa-chart-bar"
  }
];

export default Home;