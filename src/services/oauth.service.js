import api from './api';

// Google OAuth login
export const googleLogin = async (tokenId) => {
  try {
    const response = await api.post('/auth/google', { tokenId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Microsoft OAuth login
export const microsoftLogin = async (accessToken) => {
  try {
    const response = await api.post('/auth/microsoft', { accessToken });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Facebook OAuth login
export const facebookLogin = async (accessToken) => {
  try {
    const response = await api.post('/auth/facebook', { accessToken });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// LinkedIn OAuth login
export const linkedinLogin = async (code) => {
  try {
    const response = await api.post('/auth/linkedin', { code });
    return response.data;
  } catch (error) {
    throw error;
  }
};
