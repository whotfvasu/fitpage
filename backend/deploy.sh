#!/bin/bash

# Deploy script for Render

echo "Starting deployment process at $(date)"

# Install dependencies
echo "Installing dependencies..."
npm install

# Explicitly install Express 4.18.2
echo "Installing Express 4.18.2..."
npm uninstall express
npm install express@4.18.2

# Install path-to-regexp
echo "Installing path-to-regexp..."
npm install path-to-regexp@6.2.1

# Log environment variables (without sensitive values)
echo "Environment configuration:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_NAME: $DB_NAME"

# Start the application
echo "Starting application..."
npm start
