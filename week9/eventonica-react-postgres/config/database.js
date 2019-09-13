const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGUSER,
//   password: process.env.PGPASS,
//   port: process.env.PGPORT
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}