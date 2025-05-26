# HRPBloom HRMS

AI-Driven Human Resource Management System for modern businesses.

![HRPBloom Logo](ai-hrms/client/public/hrpbloom.png)

## Key Features

### Core Functionality
- **Robust Authentication** - Secure login with role-based access control
- **Employee Management** - Comprehensive employee profiles and records
- **Attendance & Time Tracking** - QR Code-based check-in/check-out system
- **Leave Management** - AI-powered substitute assignments
- **Payroll Management** - Automated salary calculations and payslips
- **Recruitment Management** - Applicant tracking and hiring workflow

### Advanced Features
- **Performance Management** - Goal setting, reviews, and evaluations
- **Complaint Management** - Track and resolve employee grievances
- **Communication Management** - Internal messaging and announcements
- **Feedback Management** - AI Sentiment Analysis for employee feedback
- **Reports & Analytics** - Comprehensive dashboards for attendance, leave, and complaints

### Premium Features
- **AI HR Assistant** - 24/7 virtual HR assistant for common queries
- **Consultant Booking** - Access to HR professionals for specialized advice
- **Advanced Analytics** - Predictive insights and trend analysis

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

Visit [hrpbloom.com](https://hrpbloom.com) to see the live application.

## License

MIT