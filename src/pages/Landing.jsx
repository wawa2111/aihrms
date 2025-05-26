import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHeader />
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  AI-Powered HR Management for Malaysian Businesses
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Streamline your HR operations with HRPBloom, the comprehensive HR management system designed specifically for Malaysian businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-center"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/demo"
                    className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 text-center"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/hrpbloom.png"
                  alt="HRPBloom Dashboard"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to manage your workforce efficiently and comply with Malaysian employment laws.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-users text-blue-600 dark:text-blue-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Employee Management
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete employee lifecycle management from onboarding to offboarding.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-clipboard-check text-green-600 dark:text-green-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Attendance Tracking
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  QR code-based check-in/check-out system with real-time monitoring.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-calendar-alt text-yellow-600 dark:text-yellow-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Leave Management
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-powered leave request and approval system with Malaysian holiday calendar.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-robot text-purple-600 dark:text-purple-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Malaysian HR Assistant
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI assistant specialized in Malaysian employment laws and regulations.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-chart-bar text-red-600 dark:text-red-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive HR analytics and reporting for data-driven decisions.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-shield-alt text-indigo-600 dark:text-indigo-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Compliance Management
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Stay compliant with Malaysian labor laws and regulations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your HR operations?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Join hundreds of Malaysian businesses that trust HRPBloom for their HR management needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 text-center"
              >
                Sign Up Now
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-blue-700 text-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">HRPBloom</h3>
              <p className="mb-4">
                AI-powered HR management system designed for Malaysian businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-white">Request Demo</Link></li>
                <li><Link to="/customers" className="hover:text-white">Customers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white">Security</Link></li>
                <li><Link to="/compliance" className="hover:text-white">Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} HRPBloom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;