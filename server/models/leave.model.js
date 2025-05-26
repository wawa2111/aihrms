import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['annual', 'sick', 'emergency', 'maternity', 'paternity', 'unpaid', 'other'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  rejectedAt: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  substitute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  substituteAccepted: {
    type: Boolean,
    default: false
  },
  substituteAcceptedAt: {
    type: Date
  },
  documents: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  aiRecommendation: {
    score: Number,
    recommendation: String,
    factors: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for duration in days
leaveSchema.virtual('duration').get(function() {
  if (!this.startDate || !this.endDate) return 0;
  
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  return diffDays;
});

// Method to calculate working days (excluding weekends)
leaveSchema.methods.calculateWorkingDays = function() {
  if (!this.startDate || !this.endDate) return 0;
  
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  let workingDays = 0;
  
  // Clone start date to avoid modifying it
  const current = new Date(start);
  
  // Loop through each day
  while (current <= end) {
    // 0 = Sunday, 6 = Saturday
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
    
    // Move to next day
    current.setDate(current.getDate() + 1);
  }
  
  return workingDays;
};

// Method to check if leave overlaps with another leave
leaveSchema.methods.overlaps = function(otherLeave) {
  return (
    (this.startDate <= otherLeave.endDate && this.endDate >= otherLeave.startDate) ||
    (otherLeave.startDate <= this.endDate && otherLeave.endDate >= this.startDate)
  );
};

// Pre-save middleware to calculate days
leaveSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    this.days = this.calculateWorkingDays();
  }
  
  next();
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;