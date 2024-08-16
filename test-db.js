const pool = require('./backend/config/db'); 

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error ejecutando la consulta:', err.stack);
  } else {
    console.log('Hora actual de la base de datos:', res.rows[0]);
  }
  pool.end(); // Cierra la conexión después de la prueba
});
