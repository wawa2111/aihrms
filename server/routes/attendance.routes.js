import express from 'express';
import attendanceController from '../controllers/attendance.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateAttendance } from '../middleware/validation.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Check in
router.post('/check-in', validateAttendance, attendanceController.checkIn);

// Check out
router.post('/check-out', validateAttendance, attendanceController.checkOut);

// Get attendance records for current user
router.get('/me', attendanceController.getMyAttendance);

// Get attendance records for a specific date range
router.get('/range', attendanceController.getAttendanceByDateRange);

// Get attendance records for all employees - HR and Admin only
router.get('/all', authorize(['hr', 'admin']), attendanceController.getAllAttendance);

// Get attendance statistics - HR and Admin only
router.get('/stats', authorize(['hr', 'admin']), attendanceController.getAttendanceStats);

// Generate QR code for attendance
router.get('/qr-code', attendanceController.generateQRCode);

// Verify QR code for attendance
router.post('/verify-qr', attendanceController.verifyQRCode);

// Manual attendance correction - HR and Admin only
router.post('/correct', authorize(['hr', 'admin']), attendanceController.correctAttendance);

export default router;