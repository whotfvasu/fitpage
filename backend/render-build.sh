#!/bin/bash
# Render build script for backend

echo "===== Starting build process at $(date) ====="

# Display Node.js version
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies with explicit versions
echo "Installing Express 4.18.2..."
npm install express@4.18.2

echo "Installing path-to-regexp 6.2.1..."
npm install path-to-regexp@6.2.1

# Install all other dependencies
echo "Installing remaining dependencies..."
npm install

# Verify required dependencies are installed
echo "Verifying dependencies..."
npm list express path-to-regexp pg cors dotenv

# Display environment (without sensitive info)
echo "==== Environment Configuration ===="
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "DB_HOST is set: $(if [ -n "$DB_HOST" ]; then echo "Yes"; else echo "No"; fi)"
echo "DB_PORT is set: $(if [ -n "$DB_PORT" ]; then echo "Yes"; else echo "No"; fi)"
echo "DB_USER is set: $(if [ -n "$DB_USER" ]; then echo "Yes"; else echo "No"; fi)"
echo "DB_PASSWORD is set: $(if [ -n "$DB_PASSWORD" ]; then echo "Yes"; else echo "No"; fi)"
echo "DB_NAME is set: $(if [ -n "$DB_NAME" ]; then echo "Yes"; else echo "No"; fi)"

echo "Build completed at $(date)"
