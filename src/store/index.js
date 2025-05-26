import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authentication.reducer';

export const store = configureStore({
  reducer: {
    authentication: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['authentication/login/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['authentication.user'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;