import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('hrpbloom_auth_token') || null,
  isAuthenticated: !!localStorage.getItem('hrpbloom_auth_token'),
  loading: false,
  error: null,
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
} = authSlice.actions;

// Thunk actions
export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    dispatch(loginSuccess(userData));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    dispatch(registerSuccess(userData));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export default authSlice.reducer;