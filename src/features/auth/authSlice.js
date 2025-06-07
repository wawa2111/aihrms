import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('hrpbloom_auth_token') || null,
  isAuthenticated: !!localStorage.getItem('hrpbloom_auth_token'),
  loading: false,
  error: null,
  oauthProviders: {
    google: {
      enabled: true,
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    },
    microsoft: {
      enabled: true,
      clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID || '',
    },
    facebook: {
      enabled: true,
      appId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
    }
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('hrpbloom_auth_token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('hrpbloom_auth_token', action.payload.token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('hrpbloom_auth_token');
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    oauthLoginStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    oauthLoginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('hrpbloom_auth_token', action.payload.token);
    },
    oauthLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutSuccess,
  updateUserProfile,
  clearError,
  oauthLoginStart,
  oauthLoginSuccess,
  oauthLoginFailure
} = authSlice.actions;

// Thunk actions
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch }) => {
    try {
      dispatch(loginStart());
      // In a real app, this would be an API call
      // const response = await api.post('/auth/login', userData);
      
      // For demo purposes, we'll simulate a successful login
      const mockResponse = {
        user: {
          id: '1',
          name: 'Demo User',
          email: userData.email,
          role: 'admin'
        },
        token: 'mock_token_' + Math.random().toString(36).substring(2)
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(loginSuccess(mockResponse));
      return mockResponse;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch }) => {
    try {
      dispatch(registerStart());
      // In a real app, this would be an API call
      // const response = await api.post('/auth/register', userData);
      
      // For demo purposes, we'll simulate a successful registration
      const mockResponse = {
        user: {
          id: '1',
          name: userData.name,
          email: userData.email,
          company: userData.companyName,
          role: 'admin',
          plan: userData.plan || 'free'
        },
        token: 'mock_token_' + Math.random().toString(36).substring(2)
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(registerSuccess(mockResponse));
      return mockResponse;
    } catch (error) {
      dispatch(registerFailure(error.message));
      throw error;
    }
  }
);

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export const oauthLogin = createAsyncThunk(
  'auth/oauthLogin',
  async ({ provider, token }, { dispatch }) => {
    try {
      dispatch(oauthLoginStart());
      // In a real app, this would be an API call to verify the token
      // const response = await api.post('/auth/oauth', { provider, token });
      
      // For demo purposes, we'll simulate a successful login
      const mockResponse = {
        user: {
          id: '1',
          name: 'OAuth User',
          email: `user@${provider.toLowerCase()}.com`,
          role: 'admin'
        },
        token: 'mock_token_' + Math.random().toString(36).substring(2)
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(oauthLoginSuccess(mockResponse));
      return mockResponse;
    } catch (error) {
      dispatch(oauthLoginFailure(error.message));
      throw error;
    }
  }
);

export default authSlice.reducer;