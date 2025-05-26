import { createAsyncThunk } from "@reduxjs/toolkit.js.jsx";
import axiosInstance from "../axios/axiosInstance.js.jsx";

// Fetch quick insights using createAsyncThunk
export const getInsights = createAsyncThunk(
  "insight/getInsights",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights");
      return data.insights;
    } catch (error) {
      console.error(error || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

// Fetch updates using createAsyncThunk
export const getUpdates = createAsyncThunk(
  "insight/getUpdates",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/insights/updates");
      return data.updates;
    } catch (error) {
      console.error(error || error.message);
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);
