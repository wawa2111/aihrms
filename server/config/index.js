import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

// Default configuration
const config = {
  // Server settings
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  
  // MongoDB connection
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hrpbloom',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // SQL database connection
  sql: {
    dialect: process.env.SQL_DIALECT || 'mysql',
    host: process.env.SQL_HOST || 'localhost',
    port: parseInt(process.env.SQL_PORT, 10) || 3306,
    username: process.env.SQL_USERNAME || 'root',
    password: process.env.SQL_PASSWORD || '',
    database: process.env.SQL_DATABASE || 'hrpbloom_sql',
    sync: process.env.SQL_SYNC === 'true'
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWTSECRET || 'hrpbloom_default_jwt_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  // CORS settings
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  },
  
  // OAuth providers
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET
    }
  },
  
  // Email configuration
  email: {
    service: process.env.EMAIL_SERVICE || 'smtp',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM || 'hrpbloom@gmail.com'
  },
  
  // API keys
  apiKeys: {
    openai: process.env.OPENAI_API_KEY
  },
  
  // Malaysian HR Assistant
  malaysianHR: {
    apiEndpoint: process.env.MALAYSIAN_HR_API_ENDPOINT,
    apiKey: process.env.MALAYSIAN_HR_API_KEY
  },
  
  // File storage
  fileStorage: {
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880 // 5MB
  },
  
  // Security settings
  security: {
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000, // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100 // 100 requests per window
    }
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },
  
  // Testing
  test: {
    skipAuth: process.env.SKIP_AUTH === 'true',
    testUser: {
      email: process.env.TEST_USER_EMAIL || 'test@hrpbloom.com',
      password: process.env.TEST_USER_PASSWORD || 'Test@123'
    }
  }
};

export default config;