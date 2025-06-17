import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Logging function for database operations
const logDbOperation = (message, isError = false) => {
  const timestamp = new Date().toISOString();
  const logMethod = isError ? console.error : console.log;
  logMethod(`[${timestamp}] DB: ${message}`);
};

// Create pool with connection retry logic
const createDbPool = () => {
  logDbOperation("Initializing database connection pool");

  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }, // Required for Supabase connections
    connectionTimeoutMillis: 10000, // 10 seconds
    idleTimeoutMillis: 30000, // 30 seconds
    max: 20, // Maximum number of clients in the pool
  });

  // Log connection events
  pool.on("connect", () => {
    logDbOperation("Connected to PostgreSQL database");
  });

  pool.on("error", (err) => {
    logDbOperation(`Database connection error: ${err.message}`, true);
  });

  // Add connection testing
  testConnection(pool);

  return pool;
};

// Test database connection
const testConnection = async (pool) => {
  let retries = 3;
  let connected = false;

  while (retries > 0 && !connected) {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT NOW()");
      logDbOperation(`Database connection successful. Server time: ${result.rows[0].now}`);
      client.release();
      connected = true;
    } catch (err) {
      retries--;
      logDbOperation(`Database connection failed: ${err.message}. Retries left: ${retries}`, true);
      if (retries > 0) {
        logDbOperation(`Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
      }
    }
  }

  if (!connected) {
    logDbOperation("All database connection attempts failed. Application will continue but database operations will likely fail.", true);
  }
};

const pool = createDbPool();

export default pool;
