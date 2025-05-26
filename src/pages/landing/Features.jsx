import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/hrpbloom.png" 
                  alt="HRPBloom Logo" 
                  className="h-10 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">HRPBloom</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link 
                  to="/features" 
                  className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                >
                  Features
                </Link>
                <Link 
                  to="/pricing" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Pricing
                </Link>
                <Link 
                  to="/about" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  About
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Comprehensive HR Management Features
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            HRPBloom HRMS offers a complete suite of features to streamline your HR operations,
            enhance employee experience, and drive organizational growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-5 rounded-lg shadow-md bg-white dark:bg-gray-800"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300">
                  <i className={`fas ${feature.icon} text-lg`}></i>
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/login" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
      
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
    title: "Robust Authentication",
    description: "Secure login with role-based access control and two-factor authentication",
    icon: "fa-lock"
  },
  {
    title: "Employee Management",
    description: "Comprehensive employee profiles, records, and document management",
    icon: "fa-user-tie"
  },
  {
    title: "Attendance & Time Tracking",
    description: "QR Code-based check-in/check-out system with geolocation verification",
    icon: "fa-qrcode"
  },
  {
    title: "Leave Management",
    description: "AI-powered substitute assignments and leave balance tracking",
    icon: "fa-calendar-alt"
  },
  {
    title: "Payroll Management",
    description: "Automated salary calculations, tax deductions, and payslip generation",
    icon: "fa-money-bill-wave"
  },
  {
    title: "Recruitment Management",
    description: "Applicant tracking, interview scheduling, and hiring workflow",
    icon: "fa-user-plus"
  },
  {
    title: "Performance Management",
    description: "Goal setting, performance reviews, and skill evaluations",
    icon: "fa-chart-line"
  },
  {
    title: "Complaint Management",
    description: "Track and resolve employee grievances with escalation workflows",
    icon: "fa-exclamation-circle"
  },
  {
    title: "Communication Management",
    description: "Internal messaging, announcements, and notification system",
    icon: "fa-comments"
  },
  {
    title: "Feedback Management",
    description: "AI Sentiment Analysis for employee feedback and satisfaction tracking",
    icon: "fa-comment-dots"
  },
  {
    title: "Reports & Analytics",
    description: "Comprehensive dashboards for attendance, leave, and complaints",
    icon: "fa-chart-bar"
  },
  {
    title: "AI HR Assistant",
    description: "24/7 virtual HR assistant for common queries and guidance",
    icon: "fa-robot"
  }
];

export default Features;