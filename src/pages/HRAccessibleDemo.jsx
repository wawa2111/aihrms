import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/ui/LandingHeader';
import AccessibilityControls from '../components/shared/AccessibilityControls';
import AccessibleTable from '../components/shared/AccessibleTable';

function HRAccessibleDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Employee data for HR dashboard
  const employeeData = {
    headers: ['ID', 'Name', 'Department', 'Position', 'Status'],
    data: [
      ['EMP001', 'Sarah Chen', 'HR', 'HR Manager', 'Active'],
      ['EMP002', 'David Kumar', 'Finance', 'Financial Analyst', 'Active'],
      ['EMP003', 'Aisha Abdullah', 'Marketing', 'Marketing Director', 'On Leave'],
      ['EMP004', 'Michael Wong', 'IT', 'Senior Developer', 'Active'],
      ['EMP005', 'Priya Singh', 'Operations', 'Operations Manager', 'Active']
    ]
  };
  
  // Leave requests data
  const leaveRequestsData = {
    headers: ['Request ID', 'Employee', 'Type', 'From', 'To', 'Status'],
    data: [
      ['LR001', 'Aisha Abdullah', 'Annual Leave', '15/06/2023', '22/06/2023', 'Approved'],
      ['LR002', 'Michael Wong', 'Sick Leave', '10/06/2023', '12/06/2023', 'Approved'],
      ['LR003', 'David Kumar', 'Annual Leave', '20/06/2023', '25/06/2023', 'Pending'],
      ['LR004', 'Priya Singh', 'Personal Leave', '18/06/2023', '19/06/2023', 'Pending']
    ]
  };
  
  // Performance review data
  const performanceData = {
    headers: ['Employee', 'Review Period', 'Rating', 'Status'],
    data: [
      ['Sarah Chen', 'Q2 2023', '4.5/5', 'Completed'],
      ['David Kumar', 'Q2 2023', '4.2/5', 'Completed'],
      ['Aisha Abdullah', 'Q2 2023', '4.8/5', 'Completed'],
      ['Michael Wong', 'Q2 2023', '4.0/5', 'In Progress'],
      ['Priya Singh', 'Q2 2023', '4.3/5', 'In Progress']
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                HR Management System - Accessible Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience our accessible HR tools designed for all stakeholders
              </p>
            </div>
            
            {/* Accessibility Controls */}
            <AccessibilityControls />
            
            {/* HR Dashboard Tabs */}
            <div className="mb-8">
              <div role="tablist" aria-label="HR Dashboard Sections" className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  role="tab"
                  id="tab-dashboard"
                  aria-selected={activeTab === 'dashboard'}
                  aria-controls="panel-dashboard"
                  tabIndex={activeTab === 'dashboard' ? 0 : -1}
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === 'dashboard'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Employee Dashboard
                </button>
                <button
                  role="tab"
                  id="tab-leave"
                  aria-selected={activeTab === 'leave'}
                  aria-controls="panel-leave"
                  tabIndex={activeTab === 'leave' ? 0 : -1}
                  onClick={() => setActiveTab('leave')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === 'leave'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Leave Management
                </button>
                <button
                  role="tab"
                  id="tab-performance"
                  aria-selected={activeTab === 'performance'}
                  aria-controls="panel-performance"
                  tabIndex={activeTab === 'performance' ? 0 : -1}
                  onClick={() => setActiveTab('performance')}
                  className={`py-4 px-6 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    activeTab === 'performance'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Performance Reviews
                </button>
              </div>
              
              {/* Dashboard Tab Panel */}
              <div
                role="tabpanel"
                id="panel-dashboard"
                aria-labelledby="tab-dashboard"
                className={activeTab === 'dashboard' ? 'block' : 'hidden'}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Employee Directory
                  </h2>
                  
                  <div className="mb-6">
                    <label htmlFor="employee-search" className="sr-only">Search employees</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-search text-gray-400" aria-hidden="true"></i>
                      </div>
                      <input
                        type="text"
                        id="employee-search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Search employees..."
                        aria-label="Search employees"
                      />
                    </div>
                  </div>
                  
                  <AccessibleTable 
                    caption="Employee Directory" 
                    headers={employeeData.headers} 
                    data={employeeData.data} 
                    ariaLabel="Employee directory table"
                  />
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Showing 5 of 25 employees
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        aria-label="Previous page"
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <i className="fas fa-chevron-left" aria-hidden="true"></i>
                      </button>
                      <button
                        aria-label="Next page"
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <i className="fas fa-chevron-right" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Leave Management Tab Panel */}
              <div
                role="tabpanel"
                id="panel-leave"
                aria-labelledby="tab-leave"
                className={activeTab === 'leave' ? 'block' : 'hidden'}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Leave Requests
                  </h2>
                  
                  <div className="mb-6 flex flex-wrap gap-4">
                    <div>
                      <label htmlFor="leave-status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Filter by Status
                      </label>
                      <select
                        id="leave-status-filter"
                        className="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        aria-label="Filter leave requests by status"
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="leave-date-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Filter by Date
                      </label>
                      <select
                        id="leave-date-filter"
                        className="form-select rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        aria-label="Filter leave requests by date range"
                      >
                        <option value="all">All Dates</option>
                        <option value="current-month">Current Month</option>
                        <option value="next-month">Next Month</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                  </div>
                  
                  <AccessibleTable 
                    caption="Leave Requests" 
                    headers={leaveRequestsData.headers} 
                    data={leaveRequestsData.data} 
                    ariaLabel="Leave requests table"
                  />
                  
                  <div className="mt-6">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      aria-label="Create new leave request"
                    >
                      <i className="fas fa-plus mr-2" aria-hidden="true"></i>
                      New Leave Request
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Performance Reviews Tab Panel */}
              <div
                role="tabpanel"
                id="panel-performance"
                aria-labelledby="tab-performance"
                className={activeTab === 'performance' ? 'block' : 'hidden'}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Performance Reviews
                  </h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: '70%' }}
                          role="progressbar"
                          aria-valuenow={70}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="70% of performance reviews completed"
                        ></div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        70% Complete
                      </span>
                    </div>
                  </div>
                  
                  <AccessibleTable 
                    caption="Performance Reviews" 
                    headers={performanceData.headers} 
                    data={performanceData.data} 
                    ariaLabel="Performance reviews table"
                  />
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                      <i className="fas fa-info-circle mr-2" aria-hidden="true"></i>
                      Performance Review Cycle
                    </h3>
                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                      Q2 2023 performance review cycle ends on June 30th. Please ensure all reviews are completed by this date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* HR Accessibility Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                HR-Specific Accessibility Features
              </h2>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-green-600 dark:text-green-400 text-sm" aria-hidden="true"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Accessible Employee Records</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      All employee data is structured for screen readers with proper table headers and row associations
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-green-600 dark:text-green-400 text-sm" aria-hidden="true"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Keyboard-Navigable Workflows</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Complete HR tasks like approving leave requests and conducting reviews using only keyboard navigation
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-green-600 dark:text-green-400 text-sm" aria-hidden="true"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Accessible Data Exports</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Generate accessible reports and documents that maintain accessibility when exported to PDF or Excel
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1">
                    <i className="fas fa-check text-green-600 dark:text-green-400 text-sm" aria-hidden="true"></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Compliance Monitoring</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Built-in accessibility compliance checks for all HR documents and communications
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* CTA Section */}
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to experience our accessible HR platform?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link
                  to="/hr-accessible-dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  aria-label="View HR analytics dashboard"
                >
                  <i className="fas fa-chart-bar mr-2" aria-hidden="true"></i>
                  View HR Dashboard
                </Link>
                <Link
                  to="/accessible-demo-request"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="Request a personalized HR demo"
                >
                  Request HR Demo
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="View pricing plans"
                >
                  View Pricing
                </Link>
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

export default HRAccessibleDemo;