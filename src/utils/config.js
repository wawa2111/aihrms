/**
 * Application configuration
 * Loads environment variables based on the current environment
 */

const config = {
  // API endpoint
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // Authentication
  authTokenName: 'hrpbloom_auth_token',
  
  // Theme
  defaultTheme: 'light',
  
  // Pagination
  defaultPageSize: 10,
  
  // Date format
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  
  // File upload
  maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || 5242880), // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  
  // Malaysian HR Assistant
  malaysianHrAssistantEnabled: import.meta.env.VITE_MALAYSIAN_HR_ASSISTANT_ENABLED === 'true',
  
  // Feature flags
  features: {
    aiAssistant: import.meta.env.VITE_FEATURE_AI_ASSISTANT === 'true',
    qrAttendance: import.meta.env.VITE_FEATURE_QR_ATTENDANCE === 'true',
    aiLeaveManagement: import.meta.env.VITE_FEATURE_AI_LEAVE_MANAGEMENT === 'true',
    analytics: import.meta.env.VITE_FEATURE_ANALYTICS === 'true'
  },
  
  // Debug
  debug: import.meta.env.VITE_DEBUG === 'true'
};

export default config;