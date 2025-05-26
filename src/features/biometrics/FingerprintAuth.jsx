import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const FingerprintAuth = ({ onVerified }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Check if Web Authentication API is supported
  useEffect(() => {
    if (window.PublicKeyCredential && 
        window.navigator.credentials && 
        window.navigator.credentials.get) {
      setIsSupported(true);
    }
  }, []);

  // Start fingerprint authentication
  const startAuthentication = async () => {
    if (!isSupported) {
      toast.error('Fingerprint authentication is not supported on this device');
      return;
    }

    setIsVerifying(true);

    try {
      // In a real implementation, you would use the Web Authentication API
      // This is a simplified mock implementation
      
      // Check if user has registered fingerprints
      const hasRegisteredFingerprints = await mockCheckFingerprints();
      
      if (!hasRegisteredFingerprints) {
        toast.error('No fingerprints registered. Please register in device settings first.');
        setIsVerifying(false);
        return;
      }
      
      // Simulate fingerprint verification
      const success = await mockVerifyFingerprint();
      
      if (success) {
        setIsVerified(true);
        toast.success('Fingerprint verified successfully!');
        if (onVerified) onVerified(true);
      } else {
        toast.error('Fingerprint verification failed. Please try again.');
        if (onVerified) onVerified(false);
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Mock function to check if user has registered fingerprints
  const mockCheckFingerprints = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate 90% chance of having fingerprints registered
        resolve(Math.random() > 0.1);
      }, 500);
    });
  };

  // Mock function to verify fingerprint
  const mockVerifyFingerprint = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate 80% success rate
        resolve(Math.random() > 0.2);
      }, 2000);
    });
  };

  return (
    <div className="card p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Fingerprint Authentication</h2>
      
      <div className="flex flex-col items-center justify-center py-8">
        {isVerifying ? (
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-900 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-fingerprint text-4xl text-primary-500 animate-pulse"></i>
            </div>
            <p className="text-gray-700 dark:text-gray-300">Place your finger on the sensor</p>
          </div>
        ) : isVerified ? (
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-900 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-check text-4xl text-green-500"></i>
            </div>
            <p className="text-green-600 dark:text-green-400 font-medium">Verification Successful</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 mx-auto">
              <i className="fas fa-fingerprint text-4xl text-gray-400"></i>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {isSupported ? 'Ready to scan fingerprint' : 'Fingerprint authentication not supported'}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        {!isVerifying && !isVerified && (
          <button 
            onClick={startAuthentication}
            disabled={!isSupported}
            className="btn-primary"
          >
            <i className="fas fa-fingerprint mr-2"></i>
            Authenticate with Fingerprint
          </button>
        )}
        
        {isVerified && (
          <button 
            onClick={() => setIsVerified(false)}
            className="btn-secondary"
          >
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </button>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Your biometric data is processed securely on your device and is not stored on our servers.</p>
      </div>
    </div>
  );
};

export default FingerprintAuth;