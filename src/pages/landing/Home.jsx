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
                AI-Powered HR Management System for Malaysian Businesses
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Streamline your HR operations with our comprehensive HRMS platform featuring AI-driven insights, Malaysian regulatory compliance, and automation.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/demo" 
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 text-center"
                >
                  Try Demo
                </Link>
                <Link 
                  to="/case-studies" 
                  className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center"
                >
                  View Case Studies
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
              Our comprehensive HR management system offers everything Malaysian businesses need to streamline HR operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="text-blue-500 mb-4">
                  <i className={`fas ${feature.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/features" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 inline-flex items-center"
            >
              Explore All Features
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Malaysian HR Assistant Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:mr-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                    <i className="fas fa-robot text-blue-600 dark:text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Malaysian HR Assistant</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">How can I help you today?</p>
                  </div>
                </div>
                
                <div className="mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-800 dark:text-gray-200">What are the key provisions of the Employment Act 1955?</p>
                </div>
                
                <div className="mb-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                  <p className="text-gray-800 dark:text-gray-200">
                    The Employment Act 1955 is the main legislation governing employment in Peninsular Malaysia. It covers employees with wages up to RM2,000 and certain categories of employees irrespective of wages. Key provisions include working hours (max 8 hours/day, 48 hours/week), overtime rates (1.5x normal rate), annual leave (8-16 days based on years of service), sick leave (14-60 days based on years of service), and public holidays (at least 11 days).
                  </p>
                </div>
                
                <div className="mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-800 dark:text-gray-200">What are the maternity leave requirements?</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                  <p className="text-gray-800 dark:text-gray-200">
                    Under the Employment Act (Amendment) 2022, female employees are entitled to 98 consecutive days (14 weeks) of paid maternity leave. This applies to all female employees regardless of wage level. Employers are prohibited from terminating a pregnant employee except due to misconduct, willful breach of contract, or closure of business.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Malaysian HR Compliance Assistant</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our AI-powered assistant is specifically trained on Malaysian employment laws, regulations, and best practices to help your business stay compliant.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Up-to-date with the latest Malaysian employment legislation</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Provides guidance on Employment Act, Industrial Relations Act, and more</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Answers questions about SOCSO, EPF, minimum wage, and other compliance matters</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-gray-600 dark:text-gray-300">Helps reduce compliance risks and avoid costly penalties</span>
                </li>
              </ul>
              <Link 
                to="/demo" 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 inline-flex items-center"
              >
                Try the Malaysian HR Assistant
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Trusted by Leading Malaysian Companies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how Malaysian businesses across various industries have transformed their HR operations with HRPBloom.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">P</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Petronas</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "HRPBloom has revolutionized how we manage our 45,000+ workforce across multiple locations. The Malaysian HR Assistant has been invaluable for ensuring compliance with local regulations."
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Oil & Gas Industry</span>
                <span className="text-sm text-green-600 dark:text-green-400">32% reduction in HR admin work</span>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">A</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">AirAsia</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "The AI scheduling and analytics dashboard has transformed how we manage our cabin crew and ground staff. HRPBloom understands the unique challenges of Malaysian businesses."
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Aviation Industry</span>
                <span className="text-sm text-green-600 dark:text-green-400">24% reduction in staff turnover</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/case-studies" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 inline-flex items-center"
            >
              View All Case Studies
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join hundreds of Malaysian companies that have streamlined their HR processes with HRPBloom HRMS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/demo" 
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50"
            >
              Try Interactive Demo
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700"
            >
              Sign Up Now
            </Link>
          </div>
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
                AI-powered HR management system for modern Malaysian businesses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link to="/features" className="hover:text-white">Features</Link></li>
                  <li><Link to="/case-studies" className="hover:text-white">Case Studies</Link></li>
                  <li><Link to="/demo" className="hover:text-white">Demo</Link></li>
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
    title: "Malaysian Compliance",
    description: "Built-in compliance with Malaysian employment laws and regulations",
    icon: "fa-balance-scale"
  },
  {
    title: "Employee Management",
    description: "Comprehensive employee profiles and records management",
    icon: "fa-user-tie"
  },
  {
    title: "Attendance Tracking",
    description: "QR Code-based check-in/check-out system with geolocation",
    icon: "fa-qrcode"
  },
  {
    title: "Leave Management",
    description: "AI-powered substitute assignments and tracking",
    icon: "fa-calendar-alt"
  },
  {
    title: "Payroll Management",
    description: "Automated salary calculations with EPF and SOCSO integration",
    icon: "fa-money-bill-wave"
  },
  {
    title: "Malaysian HR Assistant",
    description: "AI assistant specialized in Malaysian employment regulations",
    icon: "fa-robot"
  }
];

export default Home;