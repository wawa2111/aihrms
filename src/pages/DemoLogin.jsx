import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LandingHeader from '../components/ui/LandingHeader';

function DemoLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleDemoAccess = (role) => {
    setIsLoading(true);
    
    // Create demo user based on selected role
    const demoUser = {
      id: `demo-${role}-${Date.now()}`,
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `demo-${role}@example.com`,
      role: role,
      isDemo: true
    };
    
    // Store demo user in localStorage
    localStorage.setItem('hrpbloom_auth_token', `demo_token_${role}_${Date.now()}`);
    localStorage.setItem('hrpbloom_demo_user', JSON.stringify(demoUser));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Show success message
    toast.success(`Logged in as ${demoUser.name}`);
    
    // Redirect to appropriate dashboard based on role
    setTimeout(() => {
      setIsLoading(false);
      navigate(role === 'admin' ? '/dashboard' : `/${role}-dashboard`);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHeader />
      
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Demo Access
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Choose a role to explore the platform
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleDemoAccess('admin')}
              disabled={isLoading}
              className="btn btn-primary w-full py-3 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5.001 5.001 0 0010 11z" clipRule="evenodd" />
              </svg>
              HR Admin Demo
            </button>
            
            <button
              onClick={() => handleDemoAccess('manager')}
              disabled={isLoading}
              className="btn btn-outline btn-accent w-full py-3 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Manager Demo
            </button>
            
            <button
              onClick={() => handleDemoAccess('employee')}
              disabled={isLoading}
              className="btn btn-outline btn-secondary w-full py-3 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Employee Demo
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Want to create a real account?{' '}
              <Link to="/register" className="font-medium text-accent hover:text-blue-500">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoLogin;