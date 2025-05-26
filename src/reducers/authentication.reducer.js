import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, getCurrentUser } from "../services/authentication.service";
import { googleLogin, microsoftLogin, facebookLogin } from "../services/oauth.service";

// Login user
export const login = createAsyncThunk(
  "authentication/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);

// Google login
export const loginWithGoogle = createAsyncThunk(
  "authentication/loginWithGoogle",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await googleLogin(tokenId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login with Google"
      );
    }
  }
);

// Microsoft login
export const loginWithMicrosoft = createAsyncThunk(
  "authentication/loginWithMicrosoft",
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await microsoftLogin(accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login with Microsoft"
      );
    }
  }
);

// Facebook login
export const loginWithFacebook = createAsyncThunk(
  "authentication/loginWithFacebook",
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await facebookLogin(accessToken);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login with Facebook"
      );
    }
  }
);

// Logout user
export const logout = createAsyncThunk(
  "authentication/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout"
      );
    }
  }
);

// Get current user
export const fetchCurrentUser = createAsyncThunk(
  "authentication/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Google login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Microsoft login
      .addCase(loginWithMicrosoft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithMicrosoft.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginWithMicrosoft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Facebook login
      .addCase(loginWithFacebook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Even if logout fails, we clear the state
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearState, setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;