// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);
  
  // Handle path-to-regexp errors specifically
  if (err instanceof TypeError && err.message.includes('Missing parameter name')) {
    console.error('Path-to-regexp error:', err);
    return res.status(500).json({
      error: 'Invalid route pattern',
      message: 'A route pattern in the application is invalid.',
      details: err.message
    });
  }

  // Handle other types of errors
  res.status(500).json({
    error: 'Server error',
    message: err.message || 'An unexpected error occurred'
  });
};

// 404 handler for routes that don't exist
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
};
