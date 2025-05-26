import api from './api';

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data.data;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error;
  }
};

// Check authority validity
export const checkAuthorityValidity = async (id, authority) => {
  try {
    const response = await api.post('/auth/check-authority', { id, authority });
    return response.data.success;
  } catch (error) {
    return false;
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset password
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};