const { Pool } = require('pg');

const user = process.env.PGUSER;
const host = process.env.PGHOST;
const database = process.env.PGNAME;
const password = process.env.PGPASS;
const port = process.env.PGPORT;

if (!user) throw "PGUSER env variable not found";
if (!host) throw "PGHOST env variable not found";
if (!database) throw "PGNAME env variable not found";
if (!password) throw "PGPASS env variable not found";
if (!port) throw "PGPORT env variable not found";

// using url
// const databaseUrl = process.env.DATABASE_URL;
// if(!databaseUrl) throw "DATABASE_URL env variable not found";
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

const pool = new Pool({
  user,
  host,
  database,
  password,
  port
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
}