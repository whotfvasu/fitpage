// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err);

  res.status(500).json({
    error: "Server error",
    message: err.message || "An unexpected error occurred",
  });
};

// 404 handler for routes that don't exist
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: "Not found",
    message: `Route ${req.originalUrl} not found`,
  });
};
