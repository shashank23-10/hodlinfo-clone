const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hodlinfo',
  password: 'postgres',
  port: 5432,
});

module.exports = pool;
