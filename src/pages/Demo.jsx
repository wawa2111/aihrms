import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import MalaysianHRAssistant from '../features/ai/MalaysianHRAssistant';

const Demo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Demo login credentials
  const demoCredentials = {
    email: 'demo@hrpbloom.com',
    password: 'demo123'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === demoCredentials.email && password === demoCredentials.password) {
        setIsLoggedIn(true);
        toast.success('Demo login successful!');
      } else {
        toast.error('Invalid credentials. Use demo@hrpbloom.com / demo123');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    toast.success('Logged out of demo');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HRPBloom Demo</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Experience the future of HR management with our interactive demo
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <i className="fas fa-user-tie text-3xl text-primary-600 dark:text-primary-400"></i>
                </div>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-1">Demo Account</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                Use the credentials below to access the demo
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
                  <span className="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">demo@hrpbloom.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Password:</span>
                  <span className="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">demo123</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="demo@hrpbloom.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="demo123"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Access Demo
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Want to see the full features?</p>
              <Link to="/contact" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                Request a personalized demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">HRPBloom Demo</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">demo@hrpbloom.com</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <i className="fas fa-sign-out-alt mr-1"></i>
                Exit Demo
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-tachometer-alt mr-2"></i>
              Dashboard
            </button>
            
            <button
              onClick={() => setActiveTab('hr-assistant')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hr-assistant'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-robot mr-2"></i>
              Malaysian HR Assistant
            </button>
            
            <button
              onClick={() => setActiveTab('employees')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'employees'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-users mr-2"></i>
              Employees
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="px-4 py-6">
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Demo Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                        <i className="fas fa-users text-primary-600 dark:text-primary-400"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Employees</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">1,482</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                        View all
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                        <i className="fas fa-check-circle text-green-600 dark:text-green-400"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Attendance Rate</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">96.3%</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                        View details
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 rounded-md p-3">
                        <i className="fas fa-calendar-alt text-yellow-600 dark:text-yellow-400"></i>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Leave Requests</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">24</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                        Review all
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Demo Features</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This interactive demo showcases key features of HRPBloom's AI-powered HR management system. 
                  Explore the Malaysian HR Assistant to get answers about Malaysian employment laws and regulations.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-700 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-yellow-400 dark:text-yellow-600"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 dark:text-yellow-200">
                        This is a limited demo. For a full-featured demonstration, please 
                        <Link to="/contact" className="font-medium underline"> contact our sales team</Link>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'hr-assistant' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Malaysian HR Assistant</h1>
              <MalaysianHRAssistant />
            </div>
          )}
          
          {activeTab === 'employees' && (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Employee Directory</h1>
              
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { id: 1, name: 'Ahmad Bin Abdullah', position: 'Senior HR Manager', department: 'Human Resources', location: 'Kuala Lumpur' },
                    { id: 2, name: 'Siti Binti Rahman', position: 'Finance Director', department: 'Finance', location: 'Kuala Lumpur' },
                    { id: 3, name: 'Raj Kumar', position: 'Software Engineer', department: 'IT', location: 'Cyberjaya' },
                    { id: 4, name: 'Tan Wei Ming', position: 'Marketing Specialist', department: 'Marketing', location: 'Penang' },
                    { id: 5, name: 'Nurul Huda', position: 'Operations Manager', department: 'Operations', location: 'Johor Bahru' }
                  ].map((person) => (
                    <li key={person.id}>
                      <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-primary-600 dark:text-primary-400 truncate">
                              {person.name}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <i className="fas fa-briefcase flex-shrink-0 mr-1.5 text-gray-400 dark:text-gray-500"></i>
                                {person.position}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:ml-6">
                                <i className="fas fa-building flex-shrink-0 mr-1.5 text-gray-400 dark:text-gray-500"></i>
                                {person.department}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                              <i className="fas fa-map-marker-alt flex-shrink-0 mr-1.5 text-gray-400 dark:text-gray-500"></i>
                              <p>
                                {person.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;