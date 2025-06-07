import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';

function AccessibleDemo() {
  // State for tab management
  const [activeTab, setActiveTab] = useState('features');
  
  // Function to handle keyboard navigation in tabs
  const handleTabKeyDown = (e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHeader />
      
      {/* Skip to main content link - accessibility feature */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-blue-600 focus:text-white focus:z-50"
      >
        Skip to main content
      </a>
      
      <main id="main-content" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                HRPBloom Accessible Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience our HR platform with accessibility at its core
              </p>
            </div>
            
            {/* Accessible tab navigation */}
            <div className="mb-8">
              <div role="tablist" aria-label="Demo sections" className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  role="tab"
                  id="tab-features"
                  aria-selected={activeTab === 'features'}
                  aria-controls="panel-features"
                  tabIndex={activeTab === 'features' ? 0 : -1}
                  onClick={() => setActiveTab('features')}
                  onKeyDown={(e) => handleTabKeyDown(e, 'features')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === 'features'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Features
                </button>
                <button
                  role="tab"
                  id="tab-interface"
                  aria-selected={activeTab === 'interface'}
                  aria-controls="panel-interface"
                  tabIndex={activeTab === 'interface' ? 0 : -1}
                  onClick={() => setActiveTab('interface')}
                  onKeyDown={(e) => handleTabKeyDown(e, 'interface')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === 'interface'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Interface
                </button>
                <button
                  role="tab"
                  id="tab-compliance"
                  aria-selected={activeTab === 'compliance'}
                  aria-controls="panel-compliance"
                  tabIndex={activeTab === 'compliance' ? 0 : -1}
                  onClick={() => setActiveTab('compliance')}
                  onKeyDown={(e) => handleTabKeyDown(e, 'compliance')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === 'compliance'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Compliance
                </button>
              </div>
              
              {/* Tab panels */}
              <div className="mt-8">
                {/* Features panel */}
                <div
                  role="tabpanel"
                  id="panel-features"
                  aria-labelledby="tab-features"
                  className={activeTab === 'features' ? 'block' : 'hidden'}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                      Key Features
                    </h2>
                    
                    <ul className="space-y-6">
                      {/* Feature 1 */}
                      <li>
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 md:mb-0">
                            <span className="sr-only">Employee Management icon</span>
                            <i className="fas fa-users text-blue-600 dark:text-blue-400 text-xl" aria-hidden="true"></i>
                          </div>
                          <div className="md:ml-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Employee Management
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              Comprehensive employee profiles with accessibility features including screen reader support, keyboard navigation, and high contrast mode. All employee data is organized in semantic HTML tables with proper headers and row associations.
                            </p>
                            <div className="mt-3">
                              <button
                                aria-label="Learn more about Employee Management"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium focus:outline-none focus:underline"
                              >
                                Learn more
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      
                      {/* Feature 2 */}
                      <li>
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4 md:mb-0">
                            <span className="sr-only">Leave Management icon</span>
                            <i className="fas fa-calendar-alt text-green-600 dark:text-green-400 text-xl" aria-hidden="true"></i>
                          </div>
                          <div className="md:ml-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Leave Management
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              Accessible leave request system with clear status indicators, color-independent visual cues, and voice navigation support. Calendar views include text alternatives and keyboard-accessible date selection.
                            </p>
                            <div className="mt-3">
                              <button
                                aria-label="Learn more about Leave Management"
                                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium focus:outline-none focus:underline"
                              >
                                Learn more
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      
                      {/* Feature 3 */}
                      <li>
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4 md:mb-0">
                            <span className="sr-only">Performance Reviews icon</span>
                            <i className="fas fa-chart-line text-purple-600 dark:text-purple-400 text-xl" aria-hidden="true"></i>
                          </div>
                          <div className="md:ml-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Performance Reviews
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                              Performance evaluation tools with accessible forms, progress indicators with both visual and text-based feedback, and customizable review templates that maintain accessibility regardless of configuration.
                            </p>
                            <div className="mt-3">
                              <button
                                aria-label="Learn more about Performance Reviews"
                                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium focus:outline-none focus:underline"
                              >
                                Learn more
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Interface panel */}
                <div
                  role="tabpanel"
                  id="panel-interface"
                  aria-labelledby="tab-interface"
                  className={activeTab === 'interface' ? 'block' : 'hidden'}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                      Accessible Interface
                    </h2>
                    
                    <div className="space-y-8">
                      {/* Interface feature 1 */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                          <i className="fas fa-universal-access text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true"></i>
                          WCAG 2.1 AA Compliance
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          Our interface meets WCAG 2.1 AA standards, ensuring accessibility for users with diverse needs. All interactive elements are keyboard accessible with visible focus indicators.
                        </p>
                      </div>
                      
                      {/* Interface feature 2 */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                          <i className="fas fa-adjust text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true"></i>
                          Contrast & Color Modes
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          High contrast mode and dark/light themes help users with visual impairments. Color is never used as the only means of conveying information.
                        </p>
                        
                        {/* Color mode demo */}
                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                            <span className="text-gray-900 font-medium">Standard Mode</span>
                          </div>
                          <div className="p-4 bg-gray-900 border border-gray-700 rounded-md shadow-sm">
                            <span className="text-white font-medium">Dark Mode</span>
                          </div>
                          <div className="p-4 bg-white border-2 border-black rounded-md shadow-sm">
                            <span className="text-black font-medium">High Contrast</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Interface feature 3 */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                          <i className="fas fa-text-height text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true"></i>
                          Text Scaling & Readability
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          All text scales properly up to 200% without loss of content or functionality. We use readable fonts with appropriate line spacing and paragraph breaks.
                        </p>
                        
                        {/* Text size demo */}
                        <div className="mt-4 space-y-3">
                          <p className="text-sm text-gray-700 dark:text-gray-300">Small text (14px)</p>
                          <p className="text-base text-gray-700 dark:text-gray-300">Normal text (16px)</p>
                          <p className="text-lg text-gray-700 dark:text-gray-300">Large text (18px)</p>
                          <p className="text-xl text-gray-700 dark:text-gray-300">Extra large text (20px)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Compliance panel */}
                <div
                  role="tabpanel"
                  id="panel-compliance"
                  aria-labelledby="tab-compliance"
                  className={activeTab === 'compliance' ? 'block' : 'hidden'}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                      Accessibility Compliance
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Compliance section */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Our Accessibility Commitment
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          HRPBloom is committed to ensuring our platform is accessible to all users, including those with disabilities. We follow these standards and practices:
                        </p>
                        
                        <ul className="mt-4 space-y-3 list-disc pl-5 text-gray-600 dark:text-gray-300">
                          <li>WCAG 2.1 Level AA compliance across all features</li>
                          <li>Regular accessibility audits and user testing</li>
                          <li>Keyboard navigation for all interactive elements</li>
                          <li>Screen reader compatibility with ARIA attributes</li>
                          <li>Alternative text for all informative images</li>
                          <li>Proper heading structure and semantic HTML</li>
                          <li>Focus management for dynamic content</li>
                        </ul>
                      </div>
                      
                      {/* Accessibility statement */}
                      <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Accessibility Statement
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                          We strive to ensure that our platform is accessible to all users. If you encounter any accessibility barriers or have suggestions for improvement, please contact our support team.
                        </p>
                        <div className="mt-4">
                          <a 
                            href="#accessibility-statement"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium focus:outline-none focus:underline"
                            aria-label="Read our full accessibility statement"
                          >
                            Read full statement
                            <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA section */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to experience our accessible HR platform?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link
                  to="/accessible-demo-request"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Request a personalized demo"
                >
                  Request Demo
                </Link>
                <a
                  href="#watch-video"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Watch a video demonstration"
                >
                  <i className="fas fa-play-circle mr-2" aria-hidden="true"></i>
                  Watch Video
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer with accessibility information */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Accessibility</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#accessibility-statement" className="hover:text-white focus:outline-none focus:underline">
                    Accessibility Statement
                  </a>
                </li>
                <li>
                  <a href="#keyboard-shortcuts" className="hover:text-white focus:outline-none focus:underline">
                    Keyboard Shortcuts
                  </a>
                </li>
                <li>
                  <a href="#screen-reader-guide" className="hover:text-white focus:outline-none focus:underline">
                    Screen Reader Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#contact" className="hover:text-white focus:outline-none focus:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#help-center" className="hover:text-white focus:outline-none focus:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#feedback" className="hover:text-white focus:outline-none focus:underline">
                    Provide Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="hover:text-white focus:outline-none focus:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white focus:outline-none focus:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} HRPBloom. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccessibleDemo;