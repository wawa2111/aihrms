import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import BiometricAuth from '../features/biometrics/BiometricAuth';

const BiometricAuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    toast.success('Biometric authentication successful!');
    
    // Redirect to dashboard after successful authentication
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Biometric Authentication</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Verify your identity using one or more biometric methods
          </p>
        </div>
        
        {isAuthenticated ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-4xl text-green-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Authentication Successful</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You have been successfully authenticated. Redirecting to dashboard...
            </p>
            <div className="flex justify-center">
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary-500 border-r-transparent"></div>
            </div>
          </div>
        ) : (
          <BiometricAuth onSuccess={handleAuthSuccess} />
        )}
        
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to traditional login
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuthPage;