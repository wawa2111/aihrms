import express from 'express';
import analyticsController from '../controllers/analytics.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication and HR/Admin authorization
router.use(authenticate);
router.use(authorize(['hr', 'admin']));

// Get attendance analytics
router.get('/attendance', analyticsController.getAttendanceAnalytics);

// Get leave analytics
router.get('/leave', analyticsController.getLeaveAnalytics);

// Get employee analytics
router.get('/employees', analyticsController.getEmployeeAnalytics);

// Get department analytics
router.get('/departments', analyticsController.getDepartmentAnalytics);

// Get turnover analytics
router.get('/turnover', analyticsController.getTurnoverAnalytics);

// Get performance analytics
router.get('/performance', analyticsController.getPerformanceAnalytics);

// Get dashboard summary
router.get('/dashboard', analyticsController.getDashboardSummary);

// Get AI insights
router.get('/insights', analyticsController.getAIInsights);

// Export analytics data
router.get('/export/:type', analyticsController.exportAnalytics);

export default router;