# aihrms

## Ai-Powered Human Resources Management System

## Overview

**aihrms** is a comprehensive, AI-driven Human Resource Management System designed to streamline HR operations and provide intelligent insights. Built with the MERN stack, it features robust modules for employee management, attendance tracking, payroll, recruitment, and more. AI integrations power sentiment analysis, automated shift assignments, and a Gemini-powered chatbot for enhanced HR efficiency.

## Features

- Robust Authentication
- Employee Management
- Attendance & Time Tracking (QR Code-based)
- Leave Management (AI Shift Assignments)
- Payroll Management
- Recruitment Management
- Performance Management
- Complaint Management
- Communication Management
- Feedback Management (AI Sentiment Analysis)
- Reports & Analytics (Attendance, Leave, Complaints)

## Tech Stack

- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- Redux for State Management
- AI Integration with Gemini

## Project Structure
```
aihrms/
│ ├── .env.local 
  ├── .eslintignore 
  ├── .prettierignore 
  ├── .prettierrc 
  ├── eslint.config.mjs 
  ├── package.json 
  ├── README.md 
  ├── .husky/ 
  │ 
  └── ... (Git hooks) 
  └── AI-HRMS/ 
  ├── .gitignore 
  ├── .nvmrc 
  ├── INSTALLATION_GUIDE.md 
  ├── LICENSE 
  ├── package.json 
  ├── README.md 
  ├── SECURITY.md 
  ├── public/ 
  ├── .vercel/ 
  ├── client/ 
  └── server/
```


- **client/**: Frontend React application
- **server/**: Backend Node.js/Express API
- **__public__/**: Static assets
- **.husky/**: Git hooks for code quality

## Getting Started

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd aihrms/AI-HRMS

2. **Install dependencies**
   ```
   npm install
   ```
3. **Set up environment variables**

    - Copy .env.local.example to .env.local and update as needed.
4. **Run the development servers**
    - For client:
    ```
    cd client
    npm start
    ```

    - For Server
   ```
    cd server
    npm start
   ```

  **License**
  
See LICENSE for license details.

  **Security**
  
  For security guidelines, see SECURITY.md.
