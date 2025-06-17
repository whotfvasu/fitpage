#!/bin/bash

# This script creates a DATABASE_URL environment variable based on individual DB config values
# This is especially useful for Render deployments

if [ -f .env ]; then
  source .env
fi

# Check if we have all required database config variables
if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ] && [ -n "$DB_USER" ] && [ -n "$DB_PASSWORD" ] && [ -n "$DB_NAME" ]; then
  # Construct the database URL
  export DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
  echo "Created DATABASE_URL from individual environment variables"
else
  echo "Some database environment variables are missing. DATABASE_URL will not be created."
fi

# Print configuration without exposing passwords
echo "===== Database Configuration ====="
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_USER: $DB_USER"
echo "DB_NAME: $DB_NAME"
echo "DATABASE_URL: ${DATABASE_URL//${DB_PASSWORD}/********}"
echo "=============================="

# Execute the passed command with the new environment
exec "$@"
