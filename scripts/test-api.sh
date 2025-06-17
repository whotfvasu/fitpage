#!/bin/bash

# API Test Script
# This script tests various API endpoints to diagnose connection issues

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Get the base URL from arguments or use default
BASE_URL=${1:-"https://fitpage-bov7.onrender.com"}
API_URL="$BASE_URL/api"

echo -e "${YELLOW}Testing API endpoints at $BASE_URL${NC}"
echo "-----------------------------------------"

# Helper function to make a request and check response
test_endpoint() {
    local endpoint=$1
    local url="$API_URL$endpoint"
    echo -e "Testing: ${YELLOW}$url${NC}"
    
    # Make request with curl
    response=$(curl -s -w "\n%{http_code}" "$url")
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Check if request succeeded
    if [ "$status_code" -ge 200 ] && [ "$status_code" -lt 300 ]; then
        echo -e "  Status: ${GREEN}$status_code OK${NC}"
        echo -e "  Response: ${body:0:100}..."
    else
        echo -e "  Status: ${RED}$status_code FAILED${NC}"
        echo -e "  Response: $body"
    fi
    echo
}

# Test health endpoint (should be public)
echo -e "${YELLOW}Testing Health Endpoint${NC}"
health_url="$BASE_URL/health"
echo -e "Testing: ${YELLOW}$health_url${NC}"
response=$(curl -s -w "\n%{http_code}" "$health_url")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')
if [ "$status_code" -ge 200 ] && [ "$status_code" -lt 300 ]; then
    echo -e "  Status: ${GREEN}$status_code OK${NC}"
    echo -e "  Response: $body"
else
    echo -e "  Status: ${RED}$status_code FAILED${NC}"
    echo -e "  Response: $body"
fi
echo

# Test root endpoint
echo -e "${YELLOW}Testing Root Endpoint${NC}"
root_url="$BASE_URL/"
echo -e "Testing: ${YELLOW}$root_url${NC}"
response=$(curl -s -w "\n%{http_code}" "$root_url")
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')
if [ "$status_code" -ge 200 ] && [ "$status_code" -lt 300 ]; then
    echo -e "  Status: ${GREEN}$status_code OK${NC}"
    echo -e "  Response: $body"
else
    echo -e "  Status: ${RED}$status_code FAILED${NC}"
    echo -e "  Response: $body"
fi
echo

# Test the special debug API endpoints
echo -e "${YELLOW}Testing Debug API Endpoints${NC}"
test_endpoint_direct() {
    local url=$1
    echo -e "Testing: ${YELLOW}$url${NC}"
    
    # Make request with curl
    response=$(curl -s -w "\n%{http_code}" "$url")
    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Check if request succeeded
    if [ "$status_code" -ge 200 ] && [ "$status_code" -lt 300 ]; then
        echo -e "  Status: ${GREEN}$status_code OK${NC}"
        echo -e "  Response: ${body:0:100}..."
    else
        echo -e "  Status: ${RED}$status_code FAILED${NC}"
        echo -e "  Response: $body"
    fi
    echo
}
test_endpoint_direct "$BASE_URL/api-test/users"
test_endpoint_direct "$BASE_URL/api-test/products"

# Test main API endpoints
echo -e "${YELLOW}Testing Main API Endpoints${NC}"
test_endpoint "/users"
test_endpoint "/products"
test_endpoint "/products/1"

echo -e "${YELLOW}API Testing Complete${NC}"
