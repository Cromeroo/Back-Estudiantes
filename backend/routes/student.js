const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Importa el controlador correctamente
const authController = require('../controllers/authController')
// Verifica que esté importado correctamente

// Proteger la ruta con verifyToken
router.get('/estudiantes/:documento', authController.verifyToken, studentController.getStudentInfo);

module.exports = router;
