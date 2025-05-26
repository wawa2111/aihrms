# HRPBloom - AI-Powered HR Management System

HRPBloom is a comprehensive HR management system with AI-driven features, designed specifically for Malaysian businesses to streamline HR operations and ensure compliance with local regulations.

## Live Demo

Visit our live application:
- [https://hrpbloom.com](https://hrpbloom.com)
- [https://aihrms.vercel.app](https://aihrms.vercel.app)

## Features

- **Employee Management**: Complete employee lifecycle management
- **Attendance Tracking**: QR code-based check-in/check-out system
- **Leave Management**: AI-powered leave request and approval system
- **AI Payroll Assistant**: Intelligent payroll processing with compliance automation
- **Automated Payroll**: Comprehensive payroll system with Malaysian tax compliance
- **Malaysian HR Assistant**: AI assistant specialized in Malaysian employment laws
- **Analytics Dashboard**: Comprehensive HR analytics and reporting

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB
- **AI Features**: Custom NLP models for HR assistance
- **Authentication**: JWT, OAuth (Google, Microsoft, Facebook)
- **Deployment**: Vercel, GitHub Actions

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

### Deployment

To deploy the application:

```bash
# Run the deployment script
./deploy.sh
```

Or manually:

```bash
# Build the project
npm run build

# Deploy to Vercel
npm run deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Company Information

HRPBloom Sdn Bhd
Company Registration No: JM1014230-X

A-5-15, Perdana View,
Jalan PJU 8/1,
Damansara Perdana,
47820 Petaling Jaya,
Selangor

Phone: +60-123143082
Email: info@hrpbloom.com