import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginWithLinkedIn } from '../reducers/authentication.reducer';
import { toast } from 'react-hot-toast';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        const provider = urlParams.get('provider') || 'linkedin'; // Default to LinkedIn for now

        // Handle errors
        if (error) {
          toast.error(`Authentication failed: ${error}`);
          navigate('/login');
          return;
        }

        // Verify state for LinkedIn
        if (provider === 'linkedin') {
          const savedState = localStorage.getItem('linkedinState');
          if (state !== savedState) {
            toast.error('Invalid state parameter');
            navigate('/login');
            return;
          }
          localStorage.removeItem('linkedinState');

          if (code) {
            await dispatch(loginWithLinkedIn(code)).unwrap();
            toast.success('LinkedIn login successful');
            navigate('/dashboard');
          }
        }

      } catch (error) {
        toast.error(error?.message || 'Authentication failed');
        navigate('/login');
      }
    };

    handleOAuthCallback();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default OAuthCallback;
