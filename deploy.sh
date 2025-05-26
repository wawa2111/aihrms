#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process for HRPBloom..."

# Build the project
echo "Building project..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

# Deploy to custom domain
echo "Configuring custom domain..."
npx vercel domains add hrpbloom.com --yes

echo "Deployment complete! The application is now live at:"
echo "- https://aihrms.vercel.app"
echo "- https://hrpbloom.com"