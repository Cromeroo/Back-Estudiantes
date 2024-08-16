const express = require('express');
const cors = require('cors');
const studentRoutes = require('../backend/routes/student');
const authRoutes = require('../backend/routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', authRoutes); // Esta línea registra las rutas de autenticación
app.use('/api', studentRoutes);

// Definir el puerto
const PORT = process.env.PORT || 8002;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});