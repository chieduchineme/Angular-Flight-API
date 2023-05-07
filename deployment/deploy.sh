#!/bin/bash

# Install dependencies
cd ..
cd src_code
npm install

# Build the application
ng build --prod

# Copy the built files to the deployment directory
cp -R dist/ ../deliverables/ourApp

# Restart the server
systemctl restart nginx
