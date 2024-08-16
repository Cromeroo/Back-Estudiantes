const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Log para confirmar que el archivo de rutas se carga correctamente, porque no carga1!!!!!
console.log('Rutas de autenticación cargadas');

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res, next) => {
  console.log('Solicitud POST /register recibida');
  next();
}, authController.register);

// Ruta para iniciar sesión
router.post('/login', (req, res, next) => {
  console.log('Solicitud POST /login recibida');
  next();
}, authController.login);

module.exports = router;
