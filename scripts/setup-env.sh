#!/bin/bash

# Script to set up environment variables for local testing
# This will be ignored for production deployment on Render
# as Render uses environment variables set in the dashboard

echo "Setting up environment variables for local testing..."

# Create or update backend .env file
cat > ../backend/.env << EOF
DB_HOST=db.fkwbvyqfxoxscnxxyenc.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=vasu18082004
DB_NAME=postgres
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
# Determine whether we need to do DB migrations
RUN_MIGRATIONS=false
EOF

# Create or update frontend .env file
cat > ../frontend/.env << EOF
# Choose the appropriate API URL based on environment

# For local development (uncomment if testing locally)
VITE_API_URL=http://localhost:3000/api

# For production deployment (uncomment for production)
# VITE_API_URL=https://fitpage-bov7.onrender.com/api

# Enable debugging
VITE_ENABLE_DEBUG=true
EOF

echo "Environment files updated successfully!"
echo ""
echo "IMPORTANT: For production deployment on Render:"
echo "1. Set environment variables in the Render dashboard"
echo "2. Make sure both frontend and backend services are properly configured"
echo "3. Check that the frontend is using the correct backend URL"
echo ""
echo "Database Note: Make sure your Supabase database is accessible from Render"
