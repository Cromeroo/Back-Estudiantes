const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
  register: async (req, res) => {
    console.log('Se recibió una solicitud de registro');

    const { username, email, password } = req.body;
    console.log(`Datos recibidos: username=${username}, email=${email}, password=${password}`);

    try {
      // Encripta la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('Contraseña encriptada:', hashedPassword);

      const existingUser = await User.findOneByEmail(email);
      if (existingUser) {
        console.log('El email ya está en uso');
        return res.status(400).json({ error: 'El email ya está en uso.' });
      }

      const newUser = await User.create(username, email, hashedPassword);
      console.log('Usuario creado exitosamente:', newUser);
      res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (err) {
      console.error('Error en el registro:', err);
      res.status(500).json({ error: 'Error al registrar el usuario.' });
    }
  },

  login: async (req, res) => {
    console.log('Se recibió una solicitud de inicio de sesión');

    const { email, password } = req.body;
    console.log(`Datos recibidos: email=${email}, password=${password}`);

    try {
      const user = await User.findOneByEmail(email);
      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(400).json({ error: 'Credenciales inválidas.' });
      }

      console.log('Contraseña en base de datos:', user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Resultado de bcrypt.compare:', isMatch);

      if (!isMatch) {
        console.log('Contraseña incorrecta');
        return res.status(400).json({ error: 'Credenciales inválidas.' });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      console.log('Inicio de sesión exitoso, token generado');
      res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
      console.error('Error en el inicio de sesión:', err);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  },

  verifyToken: (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'No ha digitado nada.' });

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token no válido.' });
    }
  }
};

module.exports = authController;