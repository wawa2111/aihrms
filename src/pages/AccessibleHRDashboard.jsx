import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';
import AccessibilityControls from '../components/shared/AccessibilityControls';
import AccessibleTable from '../components/shared/AccessibleTable';
import AccessibleHRChart from '../components/shared/AccessibleHRChart';

function AccessibleHRDashboard() {
  // HR metrics data
  const hrMetrics = [
    { label: 'Headcount', value: 125, unit: '', color: 'bg-blue-600' },
    { label: 'Turnover Rate', value: 4.2, unit: '%', color: 'bg-green-600' },
    { label: 'Avg. Time to Hire', value: 28, unit: ' days', color: 'bg-purple-600' },
    { label: 'Training Completion', value: 87, unit: '%', color: 'bg-yellow-600' }
  ];
  
  // Department distribution data
  const departmentData = [
    { label: 'Engineering', value: 42, unit: '', color: 'bg-blue-600' },
    { label: 'Sales', value: 28, unit: '', color: 'bg-green-600' },
    { label: 'Marketing', value: 18, unit: '', color: 'bg-purple-600' },
    { label: 'HR', value: 12, unit: '', color: 'bg-yellow-600' },
    { label: 'Finance', value: 15, unit: '', color: 'bg-red-600' },
    { label: 'Operations', value: 10, unit: '', color: 'bg-indigo-600' }
  ];
  
  // Recent hires data
  const recentHiresData = {
    headers: ['Name', 'Position', 'Department', 'Start Date'],
    data: [
      ['Amir Khan', 'Software Engineer', 'Engineering', '01/06/2023'],
      ['Lisa Wong', 'Sales Representative', 'Sales', '15/05/2023'],
      ['Raj Patel', 'Marketing Specialist', 'Marketing', '10/05/2023'],
      ['Sarah Johnson', 'HR Coordinator', 'HR', '01/05/2023']
    ]
  };
  
  // Upcoming reviews data
  const upcomingReviewsData = {
    headers: ['Employee', 'Position', 'Review Type', 'Due Date'],
    data: [
      ['David Chen', 'Product Manager', 'Annual Review', '15/06/2023'],
      ['Maria Garcia', 'UX Designer', 'Probation Review', '20/06/2023'],
      ['John Smith', 'Sales Manager', 'Quarterly Review', '30/06/2023']
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHeader />
      
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-blue-600 focus:text-white focus:z-50"
      >
        Skip to main content
      </a>
      
      <main id="main-content" className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  HR Dashboard
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Accessible HR analytics and management tools
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link
                  to="/hr-accessible-demo"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
                  Back to HR Demo
                </Link>
              </div>
            </div>
            
            {/* Accessibility Controls */}
            <AccessibilityControls />
            
            {/* HR Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {hrMetrics.map((metric, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                  aria-labelledby={`metric-${index}-title`}
                >
                  <h2 
                    id={`metric-${index}-title`}
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {metric.label}
                  </h2>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                      {metric.value}{metric.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Department Distribution Chart */}
              <AccessibleHRChart 
                title="Department Distribution" 
                data={departmentData} 
                type="bar" 
                ariaLabel="Bar chart showing employee distribution across departments"
              />
              
              {/* Recent Hires Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Recent Hires
                </h2>
                <AccessibleTable 
                  caption="Recent Hires" 
                  headers={recentHiresData.headers} 
                  data={recentHiresData.data} 
                  ariaLabel="Table of recent hires"
                />
              </div>
            </div>
            
            {/* Upcoming Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Upcoming Performance Reviews
              </h2>
              <AccessibleTable 
                caption="Upcoming Performance Reviews" 
                headers={upcomingReviewsData.headers} 
                data={upcomingReviewsData.data} 
                ariaLabel="Table of upcoming performance reviews"
              />
              <div className="mt-4">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Schedule a new performance review"
                >
                  <i className="fas fa-plus mr-2" aria-hidden="true"></i>
                  Schedule Review
                </button>
              </div>
            </div>
            
            {/* Accessibility Features for HR */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                HR-Specific Accessibility Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <i className="fas fa-chart-bar text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true"></i>
                    Accessible Data Visualization
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All charts and graphs include text alternatives and data tables for screen reader users. Color is never used as the only means of conveying information.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <i className="fas fa-keyboard text-green-600 dark:text-green-400 mr-2" aria-hidden="true"></i>
                    Keyboard Navigation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Complete HR workflows using only keyboard navigation. All interactive elements are accessible via keyboard with visible focus indicators.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <i className="fas fa-file-export text-purple-600 dark:text-purple-400 mr-2" aria-hidden="true"></i>
                    Accessible Reports
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Generate accessible HR reports that maintain their accessibility when exported to PDF or Excel formats.
                  </p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <i className="fas fa-universal-access text-red-600 dark:text-red-400 mr-2" aria-hidden="true"></i>
                    Inclusive Communication
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Tools for creating accessible communications for all employees, including email templates and announcement formats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} HRPBloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AccessibleHRDashboard;