import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // Add this for Supabase connections
});

// Add connection testing
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

// Test connection on startup
(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connection successful");

    // Test a simple query
    const result = await client.query("SELECT NOW()");
    console.log("Database timestamp:", result.rows[0].now);

    client.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

export default pool;
