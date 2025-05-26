import Attendance from '../models/attendance.model.js';
import User from '../models/user.model.js';
import { AppError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';
import crypto from 'crypto';

const attendanceController = {
  // Check in
  checkIn: async (req, res, next) => {
    try {
      const { location, coordinates, method, qrCode } = req.body;
      const employeeId = req.user.id;
      
      // Get current date (without time)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if already checked in today
      const existingAttendance = await Attendance.findOne({
        employee: employeeId,
        date: today
      });
      
      if (existingAttendance && existingAttendance.checkIn?.time) {
        return next(new AppError('Already checked in today', 400));
      }
      
      // Create or update attendance record
      let attendance;
      if (existingAttendance) {
        existingAttendance.checkIn = {
          time: new Date(),
          location,
          coordinates,
          method: method || 'qr',
          device: req.headers['user-agent'],
          ip: req.ip
        };
        
        attendance = await existingAttendance.save();
      } else {
        attendance = await Attendance.create({
          employee: employeeId,
          date: today,
          checkIn: {
            time: new Date(),
            location,
            coordinates,
            method: method || 'qr',
            device: req.headers['user-agent'],
            ip: req.ip
          }
        });
      }
      
      // Emit real-time update via Socket.IO
      if (req.app.get('io')) {
        req.app.get('io').emit('attendance:update', {
          type: 'check-in',
          employee: req.user.id,
          time: new Date()
        });
      }
      
      res.status(200).json({
        success: true,
        data: attendance
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Check out
  checkOut: async (req, res, next) => {
    try {
      const { location, coordinates, method, qrCode } = req.body;
      const employeeId = req.user.id;
      
      // Get current date (without time)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Find today's attendance record
      const attendance = await Attendance.findOne({
        employee: employeeId,
        date: today
      });
      
      if (!attendance) {
        return next(new AppError('No check-in record found for today', 400));
      }
      
      if (!attendance.checkIn?.time) {
        return next(new AppError('Must check in before checking out', 400));
      }
      
      if (attendance.checkOut?.time) {
        return next(new AppError('Already checked out today', 400));
      }
      
      // Update attendance record with check-out
      attendance.checkOut = {
        time: new Date(),
        location,
        coordinates,
        method: method || 'qr',
        device: req.headers['user-agent'],
        ip: req.ip
      };
      
      // Calculate work hours
      const checkInTime = new Date(attendance.checkIn.time);
      const checkOutTime = new Date();
      const workHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
      attendance.workHours = parseFloat(workHours.toFixed(2));
      
      // Save updated attendance
      await attendance.save();
      
      // Emit real-time update via Socket.IO
      if (req.app.get('io')) {
        req.app.get('io').emit('attendance:update', {
          type: 'check-out',
          employee: req.user.id,
          time: new Date()
        });
      }
      
      res.status(200).json({
        success: true,
        data: attendance
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get attendance records for current user
  getMyAttendance: async (req, res, next) => {
    try {
      const { startDate, endDate } = req.query;
      
      // Build query
      const query = { employee: req.user.id };
      
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
  
  // Get attendance records for a specific date range
  getAttendanceByDateRange: async (req, res, next) => {
    try {
      const { startDate, endDate, employeeId } = req.query;
      
      // Check if user is authorized to view other employees' attendance
      if (employeeId && employeeId !== req.user.id && req.user.role !== 'hr' && req.user.role !== 'admin') {
        return next(new AppError('You are not authorized to view this employee\'s attendance', 403));
      }
      
      // Build query
      const query = {};
      
      // Filter by employee
      if (employeeId) {
        query.employee = employeeId;
      } else if (req.user.role !== 'hr' && req.user.role !== 'admin') {
        query.employee = req.user.id;
      }
      
      // Filter by date range
      if (startDate && endDate) {
        query.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      
      // Get attendance records
      const attendanceRecords = await Attendance.find(query)
        .sort({ date: -1 })
        .populate('employee', 'name email employeeId');
      
      res.status(200).json({
        success: true,
        count: attendanceRecords.length,
        data: attendanceRecords
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get attendance records for all employees
  getAllAttendance: async (req, res, next) => {
    try {
      const { date, department, status } = req.query;
      
      // Build query
      const query = {};
      
      // Filter by date
      if (date) {
        const queryDate = new Date(date);
        queryDate.setHours(0, 0, 0, 0);
        query.date = queryDate;
      } else {
        // Default to today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query.date = today;
      }
      
      // Get attendance records
      let attendanceRecords = await Attendance.find(query)
        .populate({
          path: 'employee',
          select: 'name email employeeId department status'
        });
      
      // Filter by department
      if (department) {
        attendanceRecords = attendanceRecords.filter(record => 
          record.employee && record.employee.department === department
        );
      }
      
      // Filter by status
      if (status) {
        attendanceRecords = attendanceRecords.filter(record => record.status === status);
      }
      
      res.status(200).json({
        success: true,
        count: attendanceRecords.length,
        data: attendanceRecords
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get attendance statistics
  getAttendanceStats: async (req, res, next) => {
    try {
      const { startDate, endDate, department } = req.query;
      
      // Build date range
      const start = startDate ? new Date(startDate) : new Date();
      start.setHours(0, 0, 0, 0);
      
      const end = endDate ? new Date(endDate) : new Date();
      end.setHours(23, 59, 59, 999);
      
      // Build query
      const query = {
        date: {
          $gte: start,
          $lte: end
        }
      };
      
      // Get all employees
      const employeeQuery = {};
      if (department) {
        employeeQuery.department = department;
      }
      
      const employees = await User.find(employeeQuery).select('_id');
      const employeeIds = employees.map(emp => emp._id);
      
      // Get attendance records
      const attendanceRecords = await Attendance.find({
        ...query,
        employee: { $in: employeeIds }
      });
      
      // Calculate statistics
      const totalEmployees = employeeIds.length;
      const presentCount = attendanceRecords.filter(record => record.checkIn?.time).length;
      const absentCount = totalEmployees - presentCount;
      const lateCount = attendanceRecords.filter(record => record.status === 'late').length;
      const earlyCheckoutCount = attendanceRecords.filter(record => {
        if (!record.checkIn?.time || !record.checkOut?.time) return false;
        
        const workHours = record.workHours || 0;
        return workHours < 8; // Assuming 8-hour workday
      }).length;
      
      // Calculate average work hours
      const totalWorkHours = attendanceRecords.reduce((sum, record) => sum + (record.workHours || 0), 0);
      const avgWorkHours = presentCount > 0 ? totalWorkHours / presentCount : 0;
      
      res.status(200).json({
        success: true,
        data: {
          totalEmployees,
          presentCount,
          absentCount,
          lateCount,
          earlyCheckoutCount,
          attendanceRate: totalEmployees > 0 ? (presentCount / totalEmployees) * 100 : 0,
          avgWorkHours
        }
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Generate QR code for attendance
  generateQRCode: async (req, res, next) => {
    try {
      // Generate a unique code
      const timestamp = Date.now();
      const randomString = crypto.randomBytes(16).toString('hex');
      const qrCode = `${timestamp}-${randomString}`;
      
      // Store QR code in session or cache for verification
      // In a real implementation, you would store this in Redis or another cache
      if (!req.app.locals.qrCodes) {
        req.app.locals.qrCodes = {};
      }
      
      // QR code valid for 5 minutes
      req.app.locals.qrCodes[qrCode] = {
        timestamp,
        expires: timestamp + 5 * 60 * 1000
      };
      
      res.status(200).json({
        success: true,
        data: {
          qrCode,
          expires: new Date(timestamp + 5 * 60 * 1000)
        }
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Verify QR code for attendance
  verifyQRCode: async (req, res, next) => {
    try {
      const { qrCode, type } = req.body;
      
      // Check if QR code exists and is valid
      if (!req.app.locals.qrCodes || !req.app.locals.qrCodes[qrCode]) {
        return next(new AppError('Invalid QR code', 400));
      }
      
      const qrData = req.app.locals.qrCodes[qrCode];
      
      // Check if QR code has expired
      if (Date.now() > qrData.expires) {
        delete req.app.locals.qrCodes[qrCode];
        return next(new AppError('QR code has expired', 400));
      }
      
      // Process attendance based on type
      if (type === 'check-in') {
        await attendanceController.checkIn(req, res, next);
      } else if (type === 'check-out') {
        await attendanceController.checkOut(req, res, next);
      } else {
        return next(new AppError('Invalid attendance type', 400));
      }
      
      // Remove used QR code
      delete req.app.locals.qrCodes[qrCode];
    } catch (error) {
      next(error);
    }
  },
  
  // Manual attendance correction
  correctAttendance: async (req, res, next) => {
    try {
      const { employeeId, date, checkIn, checkOut, reason } = req.body;
      
      // Find employee
      const employee = await User.findById(employeeId);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Parse date
      const attendanceDate = new Date(date);
      attendanceDate.setHours(0, 0, 0, 0);
      
      // Find attendance record
      let attendance = await Attendance.findOne({
        employee: employeeId,
        date: attendanceDate
      });
      
      if (!attendance) {
        // Create new attendance record
        attendance = new Attendance({
          employee: employeeId,
          date: attendanceDate,
          isManualEntry: true,
          manualEntryBy: req.user.id,
          manualEntryReason: reason
        });
      } else {
        attendance.isManualEntry = true;
        attendance.manualEntryBy = req.user.id;
        attendance.manualEntryReason = reason;
      }
      
      // Update check-in if provided
      if (checkIn) {
        const checkInTime = new Date(checkIn);
        attendance.checkIn = {
          time: checkInTime,
          method: 'manual',
          device: req.headers['user-agent'],
          ip: req.ip
        };
      }
      
      // Update check-out if provided
      if (checkOut) {
        const checkOutTime = new Date(checkOut);
        attendance.checkOut = {
          time: checkOutTime,
          method: 'manual',
          device: req.headers['user-agent'],
          ip: req.ip
        };
      }
      
      // Calculate work hours if both check-in and check-out are provided
      if (attendance.checkIn?.time && attendance.checkOut?.time) {
        const checkInTime = new Date(attendance.checkIn.time);
        const checkOutTime = new Date(attendance.checkOut.time);
        const workHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        attendance.workHours = parseFloat(workHours.toFixed(2));
      }
      
      // Save attendance record
      await attendance.save();
      
      res.status(200).json({
        success: true,
        data: attendance
      });
    } catch (error) {
      next(error);
    }
  }
};

export default attendanceController;