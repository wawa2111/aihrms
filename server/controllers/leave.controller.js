import Leave from '../models/leave.model.js';
import User from '../models/user.model.js';
import { AppError } from '../utils/errorHandler.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

const leaveController = {
  // Get all leave requests
  getAllLeaveRequests: async (req, res, next) => {
    try {
      const { status, type, startDate, endDate, department } = req.query;
      
      // Build query
      const query = {};
      
      // Filter by status
      if (status) {
        query.status = status;
      }
      
      // Filter by type
      if (type) {
        query.type = type;
      }
      
      // Filter by date range
      if (startDate && endDate) {
        query.$or = [
          {
            startDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
          },
          {
            endDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
          },
          {
            $and: [
              { startDate: { $lte: new Date(startDate) } },
              { endDate: { $gte: new Date(endDate) } }
            ]
          }
        ];
      }
      
      // Get leave requests
      let leaveRequests = await Leave.find(query)
        .populate('employee', 'name email employeeId department')
        .populate('approver', 'name email')
        .populate('substitute', 'name email')
        .sort({ createdAt: -1 });
      
      // Filter by department
      if (department) {
        leaveRequests = leaveRequests.filter(request => 
          request.employee && request.employee.department === department
        );
      }
      
      res.status(200).json({
        success: true,
        count: leaveRequests.length,
        data: leaveRequests
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get leave requests for current user
  getMyLeaveRequests: async (req, res, next) => {
    try {
      const { status, year } = req.query;
      
      // Build query
      const query = { employee: req.user.id };
      
      // Filter by status
      if (status) {
        query.status = status;
      }
      
      // Filter by year
      if (year) {
        const startOfYear = new Date(`${year}-01-01`);
        const endOfYear = new Date(`${year}-12-31`);
        query.$or = [
          {
            startDate: { $gte: startOfYear, $lte: endOfYear }
          },
          {
            endDate: { $gte: startOfYear, $lte: endOfYear }
          }
        ];
      }
      
      // Get leave requests
      const leaveRequests = await Leave.find(query)
        .populate('approver', 'name email')
        .populate('substitute', 'name email')
        .sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: leaveRequests.length,
        data: leaveRequests
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get leave requests for a specific employee
  getEmployeeLeaveRequests: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, year } = req.query;
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Check if user is authorized to view this employee's leave requests
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        // Check if user is the employee's manager
        if (employee.manager && employee.manager.toString() !== req.user.id) {
          return next(new AppError('You are not authorized to view this employee\'s leave requests', 403));
        }
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
        query.$or = [
          {
            startDate: { $gte: startOfYear, $lte: endOfYear }
          },
          {
            endDate: { $gte: startOfYear, $lte: endOfYear }
          }
        ];
      }
      
      // Get leave requests
      const leaveRequests = await Leave.find(query)
        .populate('approver', 'name email')
        .populate('substitute', 'name email')
        .sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: leaveRequests.length,
        data: leaveRequests
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Create new leave request
  createLeaveRequest: async (req, res, next) => {
    try {
      const { type, startDate, endDate, reason, substitute } = req.body;
      
      // Calculate working days
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Check if start date is before end date
      if (start > end) {
        return next(new AppError('Start date cannot be after end date', 400));
      }
      
      // Check if dates are in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (start < today) {
        return next(new AppError('Cannot request leave for past dates', 400));
      }
      
      // Calculate working days
      let days = 0;
      const current = new Date(start);
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days++;
        }
        current.setDate(current.getDate() + 1);
      }
      
      // Create leave request
      const leaveRequest = await Leave.create({
        employee: req.user.id,
        type,
        startDate: start,
        endDate: end,
        days,
        reason,
        substitute,
        status: 'pending'
      });
      
      // Populate references
      await leaveRequest.populate('substitute', 'name email');
      
      // Emit real-time update via Socket.IO
      if (req.app.get('io')) {
        req.app.get('io').emit('leave:update', {
          type: 'new-request',
          request: leaveRequest
        });
      }
      
      res.status(201).json({
        success: true,
        data: leaveRequest
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Update leave request
  updateLeaveRequest: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { reason, substitute } = req.body;
      
      // Find leave request
      const leaveRequest = await Leave.findById(id);
      if (!leaveRequest) {
        return next(new AppError('Leave request not found', 404));
      }
      
      // Check if user is authorized to update this leave request
      if (leaveRequest.employee.toString() !== req.user.id) {
        return next(new AppError('You are not authorized to update this leave request', 403));
      }
      
      // Check if leave request is pending
      if (leaveRequest.status !== 'pending') {
        return next(new AppError('Cannot update leave request that is not pending', 400));
      }
      
      // Update fields
      if (reason) leaveRequest.reason = reason;
      if (substitute) leaveRequest.substitute = substitute;
      
      // Save updated leave request
      await leaveRequest.save();
      
      // Populate references
      await leaveRequest.populate('substitute', 'name email');
      
      res.status(200).json({
        success: true,
        data: leaveRequest
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Cancel leave request
  cancelLeaveRequest: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Find leave request
      const leaveRequest = await Leave.findById(id);
      if (!leaveRequest) {
        return next(new AppError('Leave request not found', 404));
      }
      
      // Check if user is authorized to cancel this leave request
      if (leaveRequest.employee.toString() !== req.user.id && req.user.role !== 'hr' && req.user.role !== 'admin') {
        return next(new AppError('You are not authorized to cancel this leave request', 403));
      }
      
      // Check if leave request is pending or approved
      if (leaveRequest.status !== 'pending' && leaveRequest.status !== 'approved') {
        return next(new AppError('Cannot cancel leave request that is not pending or approved', 400));
      }
      
      // Update status
      leaveRequest.status = 'cancelled';
      
      // Save updated leave request
      await leaveRequest.save();
      
      // Emit real-time update via Socket.IO
      if (req.app.get('io')) {
        req.app.get('io').emit('leave:update', {
          type: 'cancelled',
          request: leaveRequest
        });
      }
      
      res.status(200).json({
        success: true,
        data: leaveRequest
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Approve leave request
  approveLeaveRequest: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Find leave request
      const leaveRequest = await Leave.findById(id);
      if (!leaveRequest) {
        return next(new AppError('Leave request not found', 404));
      }
      
      // Check if user is authorized to approve this leave request
      if (req.user.role !== 'hr' && req.user.role !== 'admin') {
        // Check if user is the employee's manager
        const employee = await User.findById(leaveRequest.employee);
        if (!employee || !employee.manager || employee.manager.toString() !== req.user.id) {
          return next(new AppError('You are not authorized to approve this leave request', 403));
        }
      }
      
      // Check if leave request is pending
      if (leaveRequest.status !== 'pending') {
        return next(new AppError('Cannot approve leave request that is not pending', 400));
      }
      
      // Update status
      leaveRequest.status = 'approved';
      leaveRequest.approver = req.user.id;
      leaveRequest.approvedAt = Date.now();
      
      // Save updated leave request
      await leaveRequest.save();
      
      // Populate references
      await leaveRequest.populate('approver', 'name email');
      
      // Emit real-time update via Socket.IO
      if (req.app.get('io')) {
        req.app.get('io').emit('leave:update', {
          type: 'approved',
          request: leaveRequest
        });
      }
      
      res.status(200).json({
        success: true,
        data: leaveRequest
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Reject leave request
  rejectLeaveRequest: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rejectionReason } = req.body;
      
      // Find leave request
      const leaveRequest = await Leave.findById(id);
      if (!leaveRequest) {
        return next(new AppError('Leave request not found', 404));
      }
      
      // Check if user is authorized to reject this leave request
      if (req.user.role !== 'hr' && req.user.role !== 'admin') {
        // Check if user is the employee's manager
        const employee = await User.findById(leaveRequest.employee);
        if (!employee || !employee.manager || employee.manager.toString() !== req.user.id) {
          return next(new AppError('You are not authorized to reject this leave request', 403));
        }
      }
      
      // Check if leave request is pending
      if (leaveRequest.status !== 'pending') {
        return next(new AppError('Cannot reject leave request that is not pending', 400));
      }
      
      // Update status
      leaveRequest.status = 'rejected';
      leaveRequest.approver = req.user.id;
      leaveRequest.rejectedAt = Date.now();
      leaveRequest.rejectionReason = rejectionReason;
      
      // Save updated leave request
      await leaveRequest.save();
      
      // Populate references
      await leaveRequest.populate('approver', 'name email');
      
      // Emit real-time update via Socket.IO
      if (req.app.get('io')) {
        req.app.get('io').emit('leave:update', {
          type: 'rejected',
          request: leaveRequest
        });
      }
      
      res.status(200).json({
        success: true,
        data: leaveRequest
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get leave balance for current user
  getMyLeaveBalance: async (req, res, next) => {
    try {
      // Get current year
      const currentYear = new Date().getFullYear();
      
      // Get leave requests for current year
      const leaveRequests = await Leave.find({
        employee: req.user.id,
        status: 'approved',
        startDate: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      });
      
      // Calculate used leave days by type
      const usedLeave = {
        annual: 0,
        sick: 0,
        emergency: 0,
        maternity: 0,
        paternity: 0,
        unpaid: 0
      };
      
      leaveRequests.forEach(request => {
        if (usedLeave[request.type] !== undefined) {
          usedLeave[request.type] += request.days;
        }
      });
      
      // Define leave entitlements
      // In a real implementation, these would be fetched from the database or configuration
      const entitlements = {
        annual: 14, // 14 days annual leave
        sick: 14, // 14 days sick leave
        emergency: 7, // 7 days emergency leave
        maternity: 98, // 98 days maternity leave (Malaysian standard)
        paternity: 7, // 7 days paternity leave
        unpaid: 30 // 30 days unpaid leave
      };
      
      // Calculate remaining leave
      const balance = {};
      Object.keys(entitlements).forEach(type => {
        balance[type] = {
          total: entitlements[type],
          used: usedLeave[type] || 0,
          remaining: entitlements[type] - (usedLeave[type] || 0)
        };
      });
      
      res.status(200).json({
        success: true,
        data: balance
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get leave balance for a specific employee
  getEmployeeLeaveBalance: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      // Find employee
      const employee = await User.findById(id);
      if (!employee) {
        return next(new AppError('Employee not found', 404));
      }
      
      // Check if user is authorized to view this employee's leave balance
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.id !== id) {
        // Check if user is the employee's manager
        if (!employee.manager || employee.manager.toString() !== req.user.id) {
          return next(new AppError('You are not authorized to view this employee\'s leave balance', 403));
        }
      }
      
      // Get current year
      const currentYear = new Date().getFullYear();
      
      // Get leave requests for current year
      const leaveRequests = await Leave.find({
        employee: id,
        status: 'approved',
        startDate: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      });
      
      // Calculate used leave days by type
      const usedLeave = {
        annual: 0,
        sick: 0,
        emergency: 0,
        maternity: 0,
        paternity: 0,
        unpaid: 0
      };
      
      leaveRequests.forEach(request => {
        if (usedLeave[request.type] !== undefined) {
          usedLeave[request.type] += request.days;
        }
      });
      
      // Define leave entitlements
      // In a real implementation, these would be fetched from the database or configuration
      const entitlements = {
        annual: 14, // 14 days annual leave
        sick: 14, // 14 days sick leave
        emergency: 7, // 7 days emergency leave
        maternity: 98, // 98 days maternity leave (Malaysian standard)
        paternity: 7, // 7 days paternity leave
        unpaid: 30 // 30 days unpaid leave
      };
      
      // Calculate remaining leave
      const balance = {};
      Object.keys(entitlements).forEach(type => {
        balance[type] = {
          total: entitlements[type],
          used: usedLeave[type] || 0,
          remaining: entitlements[type] - (usedLeave[type] || 0)
        };
      });
      
      res.status(200).json({
        success: true,
        data: balance
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get AI recommendations for leave request
  getLeaveRecommendation: async (req, res, next) => {
    try {
      const { startDate, endDate, type } = req.body;
      
      // Calculate working days
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Check if start date is before end date
      if (start > end) {
        return next(new AppError('Start date cannot be after end date', 400));
      }
      
      // Calculate working days
      let days = 0;
      const current = new Date(start);
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days++;
        }
        current.setDate(current.getDate() + 1);
      }
      
      // Check for overlapping leave requests
      const overlappingRequests = await Leave.find({
        employee: req.user.id,
        status: { $in: ['pending', 'approved'] },
        $or: [
          {
            startDate: { $lte: end },
            endDate: { $gte: start }
          }
        ]
      });
      
      // Get current year
      const currentYear = new Date().getFullYear();
      
      // Get approved leave requests for current year
      const approvedLeaves = await Leave.find({
        employee: req.user.id,
        status: 'approved',
        type,
        startDate: {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`)
        }
      });
      
      // Calculate used leave days
      const usedDays = approvedLeaves.reduce((total, leave) => total + leave.days, 0);
      
      // Define leave entitlements
      const entitlements = {
        annual: 14,
        sick: 14,
        emergency: 7,
        maternity: 98,
        paternity: 7,
        unpaid: 30
      };
      
      // Check if employee has enough leave balance
      const remainingDays = entitlements[type] - usedDays;
      const hasEnoughBalance = remainingDays >= days;
      
      // Generate recommendation
      const recommendation = {
        days,
        overlappingRequests: overlappingRequests.length > 0,
        hasEnoughBalance,
        remainingDays,
        approvalLikelihood: overlappingRequests.length > 0 ? 'Low' : hasEnoughBalance ? 'High' : 'Medium',
        message: overlappingRequests.length > 0 
          ? 'Your leave request overlaps with existing requests. Consider adjusting your dates.'
          : !hasEnoughBalance
          ? `You don't have enough ${type} leave balance for this request. Consider using unpaid leave or adjusting the duration.`
          : 'Your leave request looks good and is likely to be approved.'
      };
      
      res.status(200).json({
        success: true,
        data: recommendation
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Get substitute recommendations for leave request
  getSubstituteRecommendations: async (req, res, next) => {
    try {
      const { startDate, endDate, department } = req.body;
      
      // Find current user
      const currentUser = await User.findById(req.user.id);
      if (!currentUser) {
        return next(new AppError('User not found', 404));
      }
      
      // Find potential substitutes (same department, not on leave during the period)
      const potentialSubstitutes = await User.find({
        _id: { $ne: req.user.id },
        department: department || currentUser.department,
        status: 'active'
      }).select('name email position');
      
      // Check which substitutes are not on leave during the period
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      const availableSubstitutes = [];
      
      for (const substitute of potentialSubstitutes) {
        // Check if substitute has approved leave during the period
        const overlappingLeave = await Leave.findOne({
          employee: substitute._id,
          status: 'approved',
          $or: [
            {
              startDate: { $lte: end },
              endDate: { $gte: start }
            }
          ]
        });
        
        if (!overlappingLeave) {
          availableSubstitutes.push(substitute);
        }
      }
      
      res.status(200).json({
        success: true,
        count: availableSubstitutes.length,
        data: availableSubstitutes
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Bulk approve leave requests
  bulkApproveLeaveRequests: async (req, res, next) => {
    try {
      const { leaveIds } = req.body;
      
      if (!leaveIds || !Array.isArray(leaveIds) || leaveIds.length === 0) {
        return next(new AppError('Please provide an array of leave request IDs', 400));
      }
      
      // Check if user is authorized to approve leave requests
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return next(new AppError('You are not authorized to approve leave requests', 403));
      }
      
      // Validate all IDs are valid MongoDB ObjectIds
      const validIds = leaveIds.filter(id => mongoose.Types.ObjectId.isValid(id));
      
      if (validIds.length !== leaveIds.length) {
        return next(new AppError('One or more invalid leave request IDs provided', 400));
      }
      
      // Find all leave requests
      const leaveRequests = await Leave.find({
        _id: { $in: validIds },
        status: 'pending'
      }).populate('employee', 'name email manager department');
      
      if (leaveRequests.length === 0) {
        return next(new AppError('No pending leave requests found with the provided IDs', 404));
      }
      
      // Check authorization for each leave request if user is a manager
      if (req.user.role === 'manager') {
        const unauthorizedRequests = leaveRequests.filter(request => 
          !request.employee.manager || request.employee.manager.toString() !== req.user.id
        );
        
        if (unauthorizedRequests.length > 0) {
          return next(new AppError('You are not authorized to approve one or more of these leave requests', 403));
        }
      }
      
      // Update all leave requests
      const now = new Date();
      const bulkOps = leaveRequests.map(request => ({
        updateOne: {
          filter: { _id: request._id },
          update: {
            $set: {
              status: 'approved',
              approver: req.user.id,
              approvedAt: now
            }
          }
        }
      }));
      
      const result = await Leave.bulkWrite(bulkOps);
      
      // Emit real-time updates via Socket.IO
      if (req.app.get('io')) {
        leaveRequests.forEach(request => {
          req.app.get('io').emit('leave:update', {
            type: 'approved',
            request: {
              ...request.toObject(),
              status: 'approved',
              approver: req.user.id,
              approvedAt: now
            }
          });
        });
      }
      
      // Log the bulk approval
      logger.info(`User ${req.user.id} bulk approved ${result.modifiedCount} leave requests`);
      
      res.status(200).json({
        success: true,
        message: `Successfully approved ${result.modifiedCount} leave requests`,
        count: result.modifiedCount,
        data: leaveRequests.map(request => request._id)
      });
    } catch (error) {
      next(error);
    }
  },
  
  // Bulk reject leave requests
  bulkRejectLeaveRequests: async (req, res, next) => {
    try {
      const { leaveIds, rejectionReason } = req.body;
      
      if (!leaveIds || !Array.isArray(leaveIds) || leaveIds.length === 0) {
        return next(new AppError('Please provide an array of leave request IDs', 400));
      }
      
      if (!rejectionReason) {
        return next(new AppError('Rejection reason is required', 400));
      }
      
      // Check if user is authorized to reject leave requests
      if (req.user.role !== 'hr' && req.user.role !== 'admin' && req.user.role !== 'manager') {
        return next(new AppError('You are not authorized to reject leave requests', 403));
      }
      
      // Validate all IDs are valid MongoDB ObjectIds
      const validIds = leaveIds.filter(id => mongoose.Types.ObjectId.isValid(id));
      
      if (validIds.length !== leaveIds.length) {
        return next(new AppError('One or more invalid leave request IDs provided', 400));
      }
      
      // Find all leave requests
      const leaveRequests = await Leave.find({
        _id: { $in: validIds },
        status: 'pending'
      }).populate('employee', 'name email manager department');
      
      if (leaveRequests.length === 0) {
        return next(new AppError('No pending leave requests found with the provided IDs', 404));
      }
      
      // Check authorization for each leave request if user is a manager
      if (req.user.role === 'manager') {
        const unauthorizedRequests = leaveRequests.filter(request => 
          !request.employee.manager || request.employee.manager.toString() !== req.user.id
        );
        
        if (unauthorizedRequests.length > 0) {
          return next(new AppError('You are not authorized to reject one or more of these leave requests', 403));
        }
      }
      
      // Update all leave requests
      const now = new Date();
      const bulkOps = leaveRequests.map(request => ({
        updateOne: {
          filter: { _id: request._id },
          update: {
            $set: {
              status: 'rejected',
              approver: req.user.id,
              rejectedAt: now,
              rejectionReason
            }
          }
        }
      }));
      
      const result = await Leave.bulkWrite(bulkOps);
      
      // Emit real-time updates via Socket.IO
      if (req.app.get('io')) {
        leaveRequests.forEach(request => {
          req.app.get('io').emit('leave:update', {
            type: 'rejected',
            request: {
              ...request.toObject(),
              status: 'rejected',
              approver: req.user.id,
              rejectedAt: now,
              rejectionReason
            }
          });
        });
      }
      
      // Log the bulk rejection
      logger.info(`User ${req.user.id} bulk rejected ${result.modifiedCount} leave requests`);
      
      res.status(200).json({
        success: true,
        message: `Successfully rejected ${result.modifiedCount} leave requests`,
        count: result.modifiedCount,
        data: leaveRequests.map(request => request._id)
      });
    } catch (error) {
      next(error);
    }
  }
};

export default leaveController;