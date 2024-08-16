const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos PostgreSQL:', err);
  } else {
    console.log('Conectado a la base de datos PostgreSQL');
  }
});

module.exports = pool;
