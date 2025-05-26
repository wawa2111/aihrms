# AI-HRMS Installation Guide

This guide will help you set up and run the AI-HRMS project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local or Atlas account)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/aihrms.git
cd aihrms
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory by copying the example file:

```bash
cp .env.local.example .env.local
```

Edit the `.env.local` file and fill in your actual values for:
- MongoDB connection string
- JWT secret
- Google Gemini API key
- Email configuration
- Cloudinary credentials
- Other configuration options

### 3. Install Dependencies

Install dependencies for the root project:

```bash
npm install
```

Install dependencies for the client and server:

```bash
cd ai-hrms/client && npm install
cd ../server && npm install
```

### 4. Run the Application

From the root directory, you can run both client and server concurrently:

```bash
npm start
```

Or run them separately:

For client:
```bash
cd ai-hrms/client
npm run dev
```

For server:
```bash
cd ai-hrms/server
npm run dev
```

### 5. Access the Application

- Client: http://localhost:5173
- Server: http://localhost:5000

## Troubleshooting

If you encounter any issues during installation:

1. Make sure all environment variables are correctly set
2. Check MongoDB connection is working
3. Ensure you have the correct Node.js version
4. Clear npm cache: `npm cache clean --force`
5. Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Additional Resources

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google Gemini API](https://ai.google.dev/)
- [Cloudinary](https://cloudinary.com/)

For more detailed information, refer to the README.md file.