# HRPBloom - AI-Powered HR Management System

HRPBloom is a comprehensive HR management system with AI-driven features, designed specifically for Malaysian businesses to streamline HR operations and ensure compliance with local regulations.

## Features

- **Employee Management**: Complete employee lifecycle management
- **Attendance Tracking**: QR code-based check-in/check-out system
- **Leave Management**: AI-powered leave request and approval system
- **Malaysian HR Assistant**: AI assistant specialized in Malaysian employment laws
- **Analytics Dashboard**: Comprehensive HR analytics and reporting

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB
- **AI Features**: Custom NLP models for HR assistance
- **Authentication**: JWT, OAuth (Google, Microsoft, Facebook)
- **Deployment**: Docker, GitHub Actions, Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB 6.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wawa2111/aihrms.git
   cd aihrms
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. Set up environment variables:
   ```bash
   # Copy example environment files
   cp .env.example .env
   cp server/.env.example server/.env
   
   # Edit .env files with your configuration
   ```

4. Start the development servers:
   ```bash
   # Start frontend
   npm run dev
   
   # Start backend (in another terminal)
   npm run server
   ```

### Environment Variables

The application uses different environment files for different environments:

#### Frontend Environment Variables (with VITE_ prefix)
- `.env`: Default environment variables
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables
- `.env.test`: Testing-specific variables
- `.env.local`: Local overrides (not committed to Git)

Key frontend environment variables include:
- `VITE_API_URL`: Backend API URL
- `VITE_FEATURE_*`: Feature flags for enabling/disabling features

#### Backend Environment Variables
- `.env`: Default environment variables
- `.env.development`: Development-specific variables
- `.env.production`: Production-specific variables
- `.env.test`: Testing-specific variables

Key backend environment variables include:
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWTSECRET`: Secret key for JWT tokens
- `CLIENT_URL`: Frontend URL for CORS

### Docker Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Malaysian employment law resources
- React and Node.js communities
- All contributors to this project