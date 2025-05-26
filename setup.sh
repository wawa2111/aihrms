#!/bin/bash

echo "Setting up HRPBloom HRMS..."

# Create necessary directories
mkdir -p ai-hrms/client/src/axios
mkdir -p ai-hrms/client/public

# Copy MongoDB connection string from environment if available
if [ -n "$MONGODB_URI" ]; then
  echo "Using MongoDB URI from environment"
  sed -i "s|mongodb+srv://username:password@cluster0.mongodb.net/hrpbloom|$MONGODB_URI|g" ai-hrms/server/.env
fi

# Install dependencies
echo "Installing dependencies..."
cd ai-hrms/client && npm install
cd ../server && npm install
cd ../..

# Set executable permissions
chmod +x setup.sh

echo "Setup complete! You can now run the application with:"
echo "npm start"
