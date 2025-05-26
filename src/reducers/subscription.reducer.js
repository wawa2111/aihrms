import { createSlice, createAsyncThunk } from "@reduxjs/toolkit.js.jsx";
import axios from "axios";

// Get subscription status
export const getSubscriptionStatus = createAsyncThunk(
  "subscription/getStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/subscription/status`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get subscription status"
      );
    }
  }
);

// Subscribe to a plan
export const subscribeToPlan = createAsyncThunk(
  "subscription/subscribe",
  async (planData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscription/subscribe`,
        planData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to subscribe to plan"
      );
    }
  }
);

// Cancel subscription
export const cancelSubscription = createAsyncThunk(
  "subscription/cancel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscription/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel subscription"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    loading: false,
    error: null,
    subscription: null,
    plans: [
      {
        id: "free",
        name: "Free",
        price: 0,
        features: [
          "Basic HR management",
          "Limited employee records (up to 10)",
          "Basic attendance tracking",
          "3 AI assistant messages per session"
        ],
        recommended: false
      },
      {
        id: "standard",
        name: "Standard",
        price: 49.99,
        features: [
          "All Free features",
          "Up to 50 employee records",
          "Advanced attendance tracking",
          "Basic performance management",
          "Email support",
          "Unlimited AI assistant usage"
        ],
        recommended: false
      },
      {
        id: "premium",
        name: "Premium",
        price: 99.99,
        features: [
          "All Standard features",
          "Unlimited employee records",
          "Advanced analytics and reporting",
          "Consultant booking access",
          "Priority support",
          "Custom AI assistant training",
          "API access"
        ],
        recommended: true
      }
    ]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get subscription status
      .addCase(getSubscriptionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(getSubscriptionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Subscribe to plan
      .addCase(subscribeToPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Cancel subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;