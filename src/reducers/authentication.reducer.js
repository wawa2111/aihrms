import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../services/authentication.service.js";

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
      });
  },
});

export const { clearState, setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;