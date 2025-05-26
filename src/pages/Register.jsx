import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { registerUser } = useAuth();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await registerUser(registerData);
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="companyName" className="sr-only">
              Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              required
              className="form-input"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
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
              autoComplete="new-password"
              required
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="form-input"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-accent hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Register;