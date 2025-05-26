import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle, loginWithMicrosoft, loginWithFacebook } from "../reducers/authentication.reducer";
import { toast } from "react-hot-toast";
import ButtonLoader from "../components/shared/loaders/ButtonLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.authentication);

  // Initialize OAuth SDKs
  useEffect(() => {
    // Load Google SDK
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };

    // Load Facebook SDK
    const loadFacebookScript = () => {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      
      script.onload = () => {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      };
      
      return () => {
        document.body.removeChild(script);
      };
    };

    // Load Microsoft SDK
    const loadMicrosoftScript = () => {
      const script = document.createElement('script');
      script.src = 'https://alcdn.msauth.net/browser/2.30.0/js/msal-browser.min.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };

    const googleCleanup = loadGoogleScript();
    const facebookCleanup = loadFacebookScript();
    const microsoftCleanup = loadMicrosoftScript();

    return () => {
      googleCleanup();
      facebookCleanup();
      microsoftCleanup();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if (!window.google) {
        toast.error("Google SDK not loaded. Please try again later.");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          if (response.credential) {
            try {
              await dispatch(loginWithGoogle(response.credential)).unwrap();
              toast.success("Google login successful");
              navigate("/dashboard");
            } catch (error) {
              toast.error(error || "Google login failed");
            }
          }
        }
      });
      
      window.google.accounts.id.prompt();
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      if (!window.msal) {
        toast.error("Microsoft SDK not loaded. Please try again later.");
        return;
      }

      const msalConfig = {
        auth: {
          clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
          redirectUri: import.meta.env.VITE_OAUTH_CALLBACK_URL
        }
      };
      
      const msalInstance = new window.msal.PublicClientApplication(msalConfig);
      
      const loginRequest = {
        scopes: ["user.read"]
      };
      
      msalInstance.loginPopup(loginRequest)
        .then(async (response) => {
          try {
            await dispatch(loginWithMicrosoft(response.accessToken)).unwrap();
            toast.success("Microsoft login successful");
            navigate("/dashboard");
          } catch (error) {
            toast.error(error || "Microsoft login failed");
          }
        })
        .catch(error => {
          toast.error("Microsoft login failed. Please try again.");
        });
    } catch (error) {
      toast.error("Microsoft login failed. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      if (!window.FB) {
        toast.error("Facebook SDK not loaded. Please try again later.");
        return;
      }

      window.FB.login(async (response) => {
        if (response.authResponse) {
          try {
            await dispatch(loginWithFacebook(response.authResponse.accessToken)).unwrap();
            toast.success("Facebook login successful");
            navigate("/dashboard");
          } catch (error) {
            toast.error(error || "Facebook login failed");
          }
        } else {
          toast.error("Facebook login cancelled");
        }
      }, { scope: 'email,public_profile' });
    } catch (error) {
      toast.error("Facebook login failed. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 py-10 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            create a new account
          </Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? <ButtonLoader /> : "Sign in"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <i className="fab fa-google text-red-500"></i>
          </button>
          <button
            type="button"
            onClick={handleMicrosoftLogin}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <i className="fab fa-microsoft text-blue-500"></i>
          </button>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <i className="fab fa-facebook text-blue-600"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;