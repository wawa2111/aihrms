import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Check authority validity
export const checkAuthorityValidity = async (id, authority, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/check-authority`,
      { id, authority },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.success;
  } catch (error) {
    return false;
  }
};