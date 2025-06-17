#!/bin/bash

# Deploy script for Render

# Install dependencies
npm install

# Explicitly install Express 4.18.2
npm uninstall express
npm install express@4.18.2

# Start the application
npm start
