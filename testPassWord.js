const bcrypt = require('bcrypt');

const hashedPassword = "$2b$10$NjtnAdJKejh9k9fqN6U1y.Yxn8nuucHhiYV186fz/4lU7fC72w/Oa"; 
const plainPassword = "123456"; 

const isMatch = bcrypt.compareSync(plainPassword, hashedPassword);
console.log('¿Coinciden las contraseñas?', isMatch); // Debería imprimir true si coinciden
