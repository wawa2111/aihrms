import express from 'express';
import leaveController from '../controllers/leave.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateLeaveRequest } from '../middleware/validation.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all leave requests - HR and Admin only
router.get('/all', authorize(['hr', 'admin']), leaveController.getAllLeaveRequests);

// Get leave requests for current user
router.get('/me', leaveController.getMyLeaveRequests);

// Get leave requests for a specific employee - HR, Admin, or Manager
router.get('/employee/:id', authorize(['hr', 'admin', 'manager']), leaveController.getEmployeeLeaveRequests);

// Create new leave request
router.post('/', validateLeaveRequest, leaveController.createLeaveRequest);

// Update leave request - only if pending
router.put('/:id', validateLeaveRequest, leaveController.updateLeaveRequest);

// Cancel leave request - only if pending
router.delete('/:id', leaveController.cancelLeaveRequest);

// Approve leave request - HR, Admin, or Manager
router.post('/:id/approve', authorize(['hr', 'admin', 'manager']), leaveController.approveLeaveRequest);

// Reject leave request - HR, Admin, or Manager
router.post('/:id/reject', authorize(['hr', 'admin', 'manager']), leaveController.rejectLeaveRequest);

// Get leave balance for current user
router.get('/balance', leaveController.getMyLeaveBalance);

// Get leave balance for a specific employee - HR, Admin, or Manager
router.get('/balance/:id', authorize(['hr', 'admin', 'manager']), leaveController.getEmployeeLeaveBalance);

// Get AI recommendations for leave request
router.post('/recommend', leaveController.getLeaveRecommendation);

// Get substitute recommendations for leave request
router.post('/substitutes', leaveController.getSubstituteRecommendations);

// Bulk approve leave requests - HR, Admin, or Manager
router.post('/bulk/approve', authorize(['hr', 'admin', 'manager']), leaveController.bulkApproveLeaveRequests);

// Bulk reject leave requests - HR, Admin, or Manager
router.post('/bulk/reject', authorize(['hr', 'admin', 'manager']), leaveController.bulkRejectLeaveRequests);

export default router;