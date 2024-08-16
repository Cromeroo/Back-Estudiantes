const pool = require('./backend/config/db'); 

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error ejecutando la consulta:', err.stack);
  } else {
    console.log('Hora actual de la bd:', res.rows[0]);
  }
  pool.end();
});
