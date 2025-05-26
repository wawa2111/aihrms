import express from 'express';
import aiController from '../controllers/ai.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get response from general AI assistant
router.post('/assistant', aiController.getAssistantResponse);

// Get response from Malaysian HR assistant
router.post('/malaysian-hr', aiController.getMalaysianHRResponse);

// Get leave recommendations
router.post('/leave-recommendation', aiController.getLeaveRecommendation);

// Get substitute recommendations
router.post('/substitute-recommendation', aiController.getSubstituteRecommendation);

// Get performance insights
router.post('/performance-insights', aiController.getPerformanceInsights);

// Get attendance insights
router.post('/attendance-insights', aiController.getAttendanceInsights);

// Get employee retention insights
router.post('/retention-insights', aiController.getRetentionInsights);

// Generate AI reports
router.post('/generate-report', aiController.generateReport);

export default router;