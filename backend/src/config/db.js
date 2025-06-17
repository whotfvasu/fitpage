import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create database connection pool using session pooler credentials
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Required for Supabase connections
});

export default pool;
