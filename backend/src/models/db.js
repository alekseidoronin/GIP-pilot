const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool(
  connectionString
    ? { connectionString }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || "5432"),
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "gip_pilot"
      }
);

async function query(text, params = []) {
  return pool.query(text, params);
}

module.exports = { query, pool };
