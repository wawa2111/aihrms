import { toast } from 'react-hot-toast';
import FacialRecognition from './FacialRecognition';
import FingerprintAuth from './FingerprintAuth';
import VoiceRecognition from './VoiceRecognition';

const BiometricAuth = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('face');
  const [verificationStatus, setVerificationStatus] = useState({
    face: false,
    fingerprint: false,
    voice: false
  });

  // Handle verification result
  const handleVerification = (method, success) => {
    setVerificationStatus(prev => ({
      ...prev,
      [method]: success
    }));
    
    if (success) {
      toast.success(`${method.charAt(0).toUpperCase() + method.slice(1)} verification successful!`);
      
      // Check if multi-factor authentication is required
      const requiredMethods = 1; // Change to 2 or 3 for multi-factor
      const verifiedCount = Object.values({
        ...verificationStatus,
        [method]: success
      }).filter(Boolean).length;
      
      if (verifiedCount >= requiredMethods) {
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Biometric Authentication</h2>
          
          {/* Tab navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'face'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('face')}
            >
              <i className={`fas fa-user ${activeTab === 'face' ? 'text-primary-500' : ''} mr-2`}></i>
              Facial Recognition
              {verificationStatus.face && (
                <i className="fas fa-check-circle text-green-500 ml-2"></i>
              )}
            </button>
            
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'fingerprint'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('fingerprint')}
            >
              <i className={`fas fa-fingerprint ${activeTab === 'fingerprint' ? 'text-primary-500' : ''} mr-2`}></i>
              Fingerprint
              {verificationStatus.fingerprint && (
                <i className="fas fa-check-circle text-green-500 ml-2"></i>
              )}
            </button>
            
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'voice'
                  ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('voice')}
            >
              <i className={`fas fa-microphone ${activeTab === 'voice' ? 'text-primary-500' : ''} mr-2`}></i>
              Voice Recognition
              {verificationStatus.voice && (
                <i className="fas fa-check-circle text-green-500 ml-2"></i>
              )}
            </button>
          </div>
          
          {/* Tab content */}
          <div className="mt-6">
            {activeTab === 'face' && (
              <FacialRecognition onVerified={(success) => handleVerification('face', success)} />
            )}
            
            {activeTab === 'fingerprint' && (
              <FingerprintAuth onVerified={(success) => handleVerification('fingerprint', success)} />
            )}
            
            {activeTab === 'voice' && (
              <VoiceRecognition 
                onVerified={(success) => handleVerification('voice', success)}
                phrase="My voice is my password, verify me now"
              />
            )}
          </div>
        </div>
        
        {/* Status footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Verification Status:</span>{' '}
              {Object.values(verificationStatus).some(Boolean) ? (
                <span className="text-green-500">
                  {Object.values(verificationStatus).filter(Boolean).length} method(s) verified
                </span>
              ) : (
                <span>No methods verified</span>
              )}
            </div>
            
            <div>
              <button
                className="btn-secondary text-sm"
                onClick={() => {
                  setVerificationStatus({
                    face: false,
                    fingerprint: false,
                    voice: false
                  });
                }}
              >
                <i className="fas fa-redo mr-2"></i>
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>All biometric data is processed securely and not stored permanently.</p>
        <p>For enhanced security, consider verifying with multiple methods.</p>
      </div>
    </div>
  );
};

export default BiometricAuth;