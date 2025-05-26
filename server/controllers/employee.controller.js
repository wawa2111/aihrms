import User from '../models/user.model.js';
import Attendance from '../models/attendance.model.js';
import Leave from '../models/leave.model.js';
import { AppError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

const employeeController = {
  // Get all employees
  getAllEmployees: async (req, res, next) => {
    try {
      const { department, status, search } = req.query;
      
      // Build query
      const query = {};
      
      // Filter by department
      if (department) {
        query.department = department;
      }
      
      // Filter by status
      if (status) {
        query.status = status;
      }
      
      // Search by name or email
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      
      // Exclude password field
      const employees = await User.find(query)
        .select('-password')
        .populate('manager', 'name email');
      
      res.status(200).json({
        success: true,
        count: employees.length,
        data: employees
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get employee by ID
  getEmployeeById: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Check if user is authorized to view this employee
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        return next(new AppError('You are not authorized to view this employee', 403));
      }
      
      const employee = await User.findById(id)
        .select('-password')
        .populate('manager', 'name email');
      
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      res.status(200).json({
        success: true,
        data: employee
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Create new employee
  createEmployee: async (req, res, next) => {
    try {
      const { name, email, password, department, position, phone, joinDate, manager } = req.body;
      
      // Check if employee already exists
      const existingEmployee = await User.findOne({ email });
      if (existingEmployee) {
        return next(new AppError('Employee already exists with this email', 400));
      }
      
      // Generate employee ID
      const employeeCount = await User.countDocuments();
      const employeeId = `EMP${(employeeCount + 1).toString().padStart(4, '0')}`;
      
      // Create new employee
      const newEmployee = await User.create({
        name,
        email,
        password,
        department,
        position,
        phone,
        joinDate,
        manager,
        employeeId,
        companyName: req.user.companyName
      });
      
      // Remove password from response
      newEmployee.password = undefined;
      
      res.status(201).json({
        success: true,
        data: newEmployee
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Update employee
  updateEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, department, position, phone, address, status, manager } = req.body;
      
      // Check if user is authorized to update this employee
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        return next(new AppError('You are not authorized to update this employee', 403));
      }
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Update fields
      if (name) employee.name = name;
      if (email) employee.email = email;
      if (department) employee.department = department;
      if (position) employee.position = position;
      if (phone) employee.phone = phone;
      if (address) employee.address = address;
      if (status && (req.user.role === 'hr' || req.user.role === 'admin')) {
        employee.status = status;
      }
      if (manager && (req.user.role === 'hr' || req.user.role === 'admin')) {
        employee.manager = manager;
      }
      
      // Save updated employee
      await employee.save();
      
      res.status(200).json({
        success: true,
        data: employee
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Delete employee
  deleteEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Instead of deleting, set status to terminated
      employee.status = 'terminated';
      await employee.save();
      
      res.status(200).json({
        success: true,
        message: 'Employee terminated successfully'
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get employee documents
  getEmployeeDocuments: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Check if user is authorized to view this employee's documents
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        return next(new AppError('You are not authorized to view this employee\'s documents', 403));
      }
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // TODO: Implement document retrieval
      
      res.status(200).json({
        success: true,
        data: []
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Upload employee document
  uploadDocument: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Check if user is authorized to upload documents for this employee
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        return next(new AppError('You are not authorized to upload documents for this employee', 403));
      }
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // TODO: Implement document upload
      
      res.status(200).json({
        success: true,
        message: 'Document uploaded successfully'
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get employee performance reviews
  getPerformanceReviews: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Check if user is authorized to view this employee's performance reviews
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id && req.user.id !== employee.manager) {
        return next(new AppError('You are not authorized to view this employee\'s performance reviews', 403));
      }
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // TODO: Implement performance review retrieval
      
      res.status(200).json({
        success: true,
        data: []
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get employee attendance records
  getAttendanceRecords: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { startDate, endDate } = req.query;
      
      // Check if user is authorized to view this employee's attendance records
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        return next(new AppError('You are not authorized to view this employee\'s attendance records', 403));
      }
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Build query
      const query = { employee: id };
      
      // Filter by date range
      if (startDate && endDate) {
        query.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      
      // Get attendance records
      const attendanceRecords = await Attendance.find(query).sort({ date: -1 });
      
      res.status(200).json({
        success: true,
        count: attendanceRecords.length,
        data: attendanceRecords
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get employee leave records
  getLeaveRecords: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, year } = req.query;
      
      // Check if user is authorized to view this employee's leave records
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        return next(new AppError('You are not authorized to view this employee\'s leave records', 403));
      }
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Build query
      const query = { employee: id };
      
      // Filter by status
      if (status) {
        query.status = status;
      }
      
      // Filter by year
      if (year) {
        const startOfYear = new Date(`${year}-01-01`);
        const endOfYear = new Date(`${year}-12-31`);
        query.startDate = {
          $gte: startOfYear,
          $lte: endOfYear
        };
      }
      
      // Get leave records
      const leaveRecords = await Leave.find(query)
        .sort({ startDate: -1 })
        .populate('approver', 'name email')
        .populate('substitute', 'name email');
      
      res.status(200).json({
        success: true,
        count: leaveRecords.length,
        data: leaveRecords
      });
    } catch (error) {
      next(error);
    }
  }
};

export default employeeController;