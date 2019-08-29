//require packages
const Pool = require('pg').Pool;
const pgKey = require('./keys');

const connection = new Pool({
  user: pgKey.dbUser,
  host: pgKey.dbHost,
  database: pgKey.dbName,
  password: pgKey.dbPassword,
  port: pgKey.dbPort,
});

module.exports = connection;