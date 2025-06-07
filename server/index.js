import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import winston from 'winston';
import config from './config/index.js';
import authRoutes from './routes/auth.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import leaveRoutes from './routes/leave.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { errorHandler } from './utils/errorHandler.js';

// Initialize logger
const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Initialize Express app
const app = express();
const PORT = config.port;

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origin,
    methods: ['GET', 'POST']
  }
});

// Make io accessible to routes
app.set('io', io);

// Apply middleware
app.use(cors(config.cors));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable trust proxy if we're behind a reverse proxy
app.set('trust proxy', 1);

// Apply rate limiting
const limiter = rateLimit({
  windowMs: config.security.rateLimit.windowMs,
  max: config.security.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect(config.mongodb.uri, config.mongodb.options)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
    // Don't exit process during tests
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  });

// Socket.IO connection handler
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
  
  // Real-time attendance updates
  socket.on('attendance:check-in', (data) => {
    io.emit('attendance:update', { type: 'check-in', user: data.user });
  });
  
  socket.on('attendance:check-out', (data) => {
    io.emit('attendance:update', { type: 'check-out', user: data.user });
  });
  
  // Real-time leave request updates
  socket.on('leave:request', (data) => {
    io.emit('leave:update', { type: 'new-request', request: data.request });
  });
  
  socket.on('leave:approve', (data) => {
    io.emit('leave:update', { type: 'approved', request: data.request });
  });
  
  socket.on('leave:reject', (data) => {
    io.emit('leave:update', { type: 'rejected', request: data.request });
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: config.env
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, () => {
    logger.info(`Server running in ${config.env} mode on port ${PORT}`);
  });
}

export default app;
