import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authentication.reducer.js';

export const store = configureStore({
  reducer: {
    authentication: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;