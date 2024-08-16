const axios = require('axios');

const studentController = {
  getStudentInfo: async (req, res) => {
    const { documento } = req.params;

    // Validar el formato del documento
    if (!/^\d{6,10}$/.test(documento)) {
      return res.status(400).json({ error: 'El número de documento debe tener entre 6 y 10 dígitos y solo debe contener números.' });
    }

    try {
      // Realizar la solicitud a la API externa
      const response = await axios.get(`https://api.talentotech.cymetria.com/api/v1/blockchain/obtener-estudiantes-aprobados`);

      const estudiantes = response.data.estudiantes_aprobados;
      const estudiante = estudiantes.find(est => est.estudiante.num_documento === documento);

      if (estudiante) {
        // Si el estudiante es encontrado, devolver los datos
        res.json({
          nombre: `${estudiante.estudiante.nombres} ${estudiante.estudiante.apellidos}`,
          documento: estudiante.estudiante.num_documento,
          email: estudiante.estudiante.email,
          curso: estudiante.curso.nombreCurso
        });
      } else {
        // Si el estudiante no es encontrado, devolver un mensaje de error
        res.status(404).json({ error: 'Estudiante no encontrado.' });
      }
    } catch (err) {
      // Manejar errores en la solicitud a la API
      console.error(err);
      res.status(500).json({ error: 'Error al consultar la API externa.' });
    }
  }
};

module.exports = studentController;
