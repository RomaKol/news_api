const Pool = require('pg').Pool;

const pool = new Pool({
  // user: "admin",
  // password: "root",
  // host: "localhost",
  // port: "5432:5432",
  // database: "postgres",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATA_BASE,
});

module.exports = pool;
