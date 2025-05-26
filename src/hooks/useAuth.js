import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout, register } from '../features/auth/authSlice';
import api from '../services/api';
import { useState } from 'react';

/**
 * Custom hook for authentication functionality
 */
export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const [localError, setLocalError] = useState(null);

  /**
   * Login user
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   */
  const loginUser = async (credentials) => {
    try {
      setLocalError(null);
      const response = await api.post('/auth/login', credentials);
      dispatch(login(response.data));
      return response.data;
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  /**
   * Register new user
   * @param {Object} userData - User registration data
   */
  const registerUser = async (userData) => {
    try {
      setLocalError(null);
      const response = await api.post('/auth/register', userData);
      dispatch(register(response.data));
      return response.data;
    } catch (err) {
      setLocalError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  /**
   * Logout user
   */
  const logoutUser = () => {
    dispatch(logout());
    navigate('/login');
  };

  /**
   * Check if user has specific role
   * @param {string|string[]} roles - Role or array of roles to check
   * @returns {boolean} - True if user has role
   */
  const hasRole = (roles) => {
    if (!user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    
    return user.role === roles;
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error: error || localError,
    loginUser,
    registerUser,
    logoutUser,
    hasRole,
  };
}