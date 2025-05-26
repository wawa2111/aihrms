import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginUser } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await loginUser({ email, password });
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input rounded-t-md"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input rounded-b-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-accent hover:text-blue-500">
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-accent hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;