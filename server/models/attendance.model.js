import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkIn: {
    time: {
      type: Date
    },
    location: {
      type: String
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    method: {
      type: String,
      enum: ['qr', 'manual', 'biometric', 'mobile'],
      default: 'qr'
    },
    device: {
      type: String
    },
    ip: {
      type: String
    }
  },
  checkOut: {
    time: {
      type: Date
    },
    location: {
      type: String
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    method: {
      type: String,
      enum: ['qr', 'manual', 'biometric', 'mobile'],
      default: 'qr'
    },
    device: {
      type: String
    },
    ip: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day', 'work-from-home', 'on-leave'],
    default: 'present'
  },
  workHours: {
    type: Number,
    default: 0
  },
  overtime: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  isManualEntry: {
    type: Boolean,
    default: false
  },
  manualEntryBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  manualEntryReason: {
    type: String
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

// Compound index for employee and date to ensure uniqueness
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Virtual for duration
attendanceSchema.virtual('duration').get(function() {
  if (this.checkIn?.time && this.checkOut?.time) {
    const durationMs = this.checkOut.time - this.checkIn.time;
    return Math.round(durationMs / (1000 * 60 * 60) * 100) / 100; // Convert to hours with 2 decimal places
  }
  return 0;
});

// Method to check if employee is late
attendanceSchema.methods.isLate = function(workStartTime = '09:00') {
  if (!this.checkIn?.time) return false;
  
  const checkInTime = this.checkIn.time;
  const [hours, minutes] = workStartTime.split(':').map(Number);
  
  const workStart = new Date(checkInTime);
  workStart.setHours(hours, minutes, 0, 0);
  
  return checkInTime > workStart;
};

// Method to calculate overtime
attendanceSchema.methods.calculateOvertime = function(workHours = 8) {
  if (!this.checkIn?.time || !this.checkOut?.time) return 0;
  
  const durationHours = this.duration;
  return Math.max(0, durationHours - workHours);
};

// Pre-save middleware to calculate work hours and overtime
attendanceSchema.pre('save', function(next) {
  if (this.checkIn?.time && this.checkOut?.time) {
    // Calculate work hours
    this.workHours = this.duration;
    
    // Calculate overtime
    this.overtime = this.calculateOvertime();
    
    // Determine status
    if (this.isLate()) {
      this.status = 'late';
    }
  }
  
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;