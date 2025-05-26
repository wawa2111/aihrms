import { z } from 'zod';
import logger from '../utils/logger.js';

// Validate request body against schema
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    logger.error('Validation error:', error);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }
};

// Login validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Registration validation schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  role: z.enum(['employee', 'hr', 'manager', 'admin'], {
    errorMap: () => ({ message: 'Invalid role' })
  })
});

// Employee validation schema
const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  department: z.string(),
  position: z.string(),
  joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  employeeId: z.string().optional(),
  manager: z.string().optional(),
  status: z.enum(['active', 'inactive', 'on_leave', 'terminated'], {
    errorMap: () => ({ message: 'Invalid status' })
  }).optional()
});

// Attendance validation schema
const attendanceSchema = z.object({
  employeeId: z.string().optional(),
  type: z.enum(['check-in', 'check-out'], {
    errorMap: () => ({ message: 'Type must be either check-in or check-out' })
  }),
  timestamp: z.string().optional(),
  location: z.string().optional(),
  qrCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
});

// Leave request validation schema
const leaveRequestSchema = z.object({
  employeeId: z.string().optional(),
  type: z.string(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format'),
  reason: z.string().min(3, 'Reason must be at least 3 characters'),
  substituteRequired: z.boolean().optional(),
  substituteId: z.string().optional(),
  documents: z.array(z.string()).optional()
});

// Export validation middleware
export const validateLogin = validate(loginSchema);
export const validateRegister = validate(registerSchema);
export const validateEmployee = validate(employeeSchema);
export const validateAttendance = validate(attendanceSchema);
export const validateLeaveRequest = validate(leaveRequestSchema);