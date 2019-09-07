require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGUSER,
  password: process.env.PGPASS,
  port: process.env.PGPORT
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}