import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// Add this debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
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
  });
});

// Register API routes with the correct path
app.use("/api", routes);

// Add this error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ error: "Something went wrong!", details: err.message });
});

// Add a catch-all 404 route
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
});
