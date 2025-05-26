#!/bin/bash

echo "Building HRPBloom HRMS for deployment..."

# Install dependencies
npm install

# Build the client
npm run build

# Create deployment package
mkdir -p deploy
cp -r dist deploy/
cp -r server deploy/
cp package.json deploy/
cp vercel.json deploy/

echo "Deployment package created in the 'deploy' directory"
echo "You can now deploy this package to Vercel or any other hosting service"
