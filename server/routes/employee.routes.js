import express from 'express';
import employeeController from '../controllers/employee.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validateEmployee } from '../middleware/validation.middleware.js';

const router = express.Router();

// Employee routes - all require authentication
router.use(authenticate);

// Get all employees - HR and Admin only
router.get('/', authorize(['hr', 'admin']), employeeController.getAllEmployees);

// Get employee by ID - Self or HR/Admin
router.get('/:id', employeeController.getEmployeeById);

// Create new employee - HR and Admin only
router.post('/', authorize(['hr', 'admin']), validateEmployee, employeeController.createEmployee);

// Update employee - Self or HR/Admin
router.put('/:id', validateEmployee, employeeController.updateEmployee);

// Delete employee - HR and Admin only
router.delete('/:id', authorize(['hr', 'admin']), employeeController.deleteEmployee);

// Get employee documents
router.get('/:id/documents', employeeController.getEmployeeDocuments);

// Upload employee document
router.post('/:id/documents', employeeController.uploadDocument);

// Get employee performance reviews
router.get('/:id/performance', employeeController.getPerformanceReviews);

// Get employee attendance records
router.get('/:id/attendance', employeeController.getAttendanceRecords);

// Get employee leave records
router.get('/:id/leave', employeeController.getLeaveRecords);

export default router;