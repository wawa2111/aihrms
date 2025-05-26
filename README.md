# HRPBloom HRMS

AI-Driven Human Resource Management System for modern businesses.

## Features

- Employee Management
- Attendance Tracking with QR Code
- Leave Management with AI-powered substitute assignment
- Performance Management
- Feedback and Complaint Management
- AI-Based Sentiment Analysis
- Recruitment Management
- Analytics and Reporting
- Consultant Booking
- AI HR Assistant

## Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB
- Cloudinary account
- Gmail account (for email notifications)
- Gemini API key (for AI features)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aihrms.git
   cd aihrms
   ```

2. Run the setup script:
   ```bash
   ./setup.sh
   ```

3. Configure environment variables:
   - Update `ai-hrms/server/.env` with your MongoDB URI, Cloudinary credentials, etc.
   - Update `ai-hrms/client/.env` with your API URL

4. Start the application:
   ```bash
   npm start
   ```

5. Access the application:
   - Client: http://localhost:5173
   - Server: http://localhost:5000

### Initial Login

- Admin: Use the master password defined in your environment variables
  - Username: admin
  - Password: [ADMIN_MASTER_PASSWORD from .env]

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up the custom domain (hrpbloom.com)

### Environment Variables

Required environment variables for production:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/hrpbloom
JWTSECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
CLIENT_URL=https://www.hrpbloom.com
ADMIN_MASTER_PASSWORD=your_admin_password
```

## License

MIT