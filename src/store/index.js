import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authentication.reducer.js';
import roleReducer from '../reducers/role.reducer.js';
import employeeReducer from '../reducers/employee.reducer.js';
import departmentReducer from '../reducers/department.reducer.js';
import insightsReducer from '../reducers/inshights.reducer.js';
import attendanceReducer from '../reducers/attendance.reducer.js';
import leaveReducer from '../reducers/leave.reducer.js';
import feedbackReducer from '../reducers/feedback.reducer.js';
import complaintReducer from '../reducers/complaint.reducer.js';
import updateReducer from '../reducers/update.reducer.js';
import performanceReducer from '../reducers/performance.reducer.js';
import payrollReducer from '../reducers/payroll.reducer.js';
import recruitmentReducer from '../reducers/recruitment.reducer.js';
import subscriptionReducer from '../reducers/subscription.reducer.js';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    role: roleReducer,
    employee: employeeReducer,
    department: departmentReducer,
    insights: insightsReducer,
    attendance: attendanceReducer,
    leave: leaveReducer,
    feedback: feedbackReducer,
    complaint: complaintReducer,
    update: updateReducer,
    performance: performanceReducer,
    payroll: payrollReducer,
    recruitment: recruitmentReducer,
    subscription: subscriptionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;