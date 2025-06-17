import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import validateAllRoutes from "./utils/validateAllRoutes.js";

dotenv.config();

// Log configuration at startup
console.log("Application starting with configuration:");
console.log("NODE_ENV:", process.env.NODE_ENV || "development");
console.log("PORT:", process.env.PORT || 3000);
console.log("CORS Origins:", [
  "https://fitpage-frontend.onrender.com",
  "http://localhost:5173",
]);

// Validate all routes before starting the server
try {
  validateAllRoutes();
} catch (error) {
  console.error("Route validation failed:", error);
  // Continue anyway, since we have error handling middleware
}

const app = express();

// Add detailed request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log(`  Headers: ${JSON.stringify(req.headers)}`);

  // Log request completion
  res.on("finish", () => {
    const duration = Date.now() - new Date(timestamp).getTime();
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} completed with status ${res.statusCode} in ${duration}ms`
    );
  });

  next();
});

// Fix the CORS issue by allowing both frontend domains
app.use(
  cors({
    origin: ["https://fitpage-frontend.onrender.com", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Add a root route for health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Fitpage API is running",
    timestamp: new Date().toISOString(),
  });
});

// Add a dedicated health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    env: process.env.NODE_ENV,
    database: "Configured", // Don't expose actual DB details
    routes: "Loaded",
    timestamp: new Date().toISOString(),
  });
});

// Register API routes with the correct path
app.use("/api", routes);

// Add special debug routes to test API functionality
app.get("/api-test/users", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Test User 1" },
    { id: 2, name: "Test User 2" },
  ]);
});

app.get("/api-test/products", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Test Product 1",
      description: "Test description",
      image_url: "https://placehold.co/200",
    },
    {
      id: 2,
      name: "Test Product 2",
      description: "Another test",
      image_url: "https://placehold.co/200",
    },
  ]);
});

// Add error and 404 handlers
app.use(errorHandler);
app.use("*", notFoundHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toISOString()}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
  console.log("Health check URL: http://localhost:" + PORT + "/health");
  console.log("API test URLs:");
  console.log("  - http://localhost:" + PORT + "/api-test/users");
  console.log("  - http://localhost:" + PORT + "/api-test/products");
});
