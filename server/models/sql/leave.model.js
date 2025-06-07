import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/sql.js';

const LeaveSQL = sequelize.define('Leave', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('annual', 'sick', 'emergency', 'maternity', 'paternity', 'unpaid', 'other'),
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled'),
    defaultValue: 'pending'
  },
  approverId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  approvedAt: {
    type: DataTypes.DATE
  },
  rejectedAt: {
    type: DataTypes.DATE
  },
  rejectionReason: {
    type: DataTypes.TEXT
  },
  substituteId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  substituteAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  substituteAcceptedAt: {
    type: DataTypes.DATE
  },
  mongoId: {
    type: DataTypes.STRING,
    comment: 'Reference to MongoDB document ID for data synchronization'
  }
}, {
  tableName: 'leaves',
  timestamps: true,
  indexes: [
    {
      fields: ['employeeId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['startDate', 'endDate']
    },
    {
      fields: ['mongoId'],
      unique: true,
      where: {
        mongoId: {
          [sequelize.Op.ne]: null
        }
      }
    }
  ]
});

export default LeaveSQL;