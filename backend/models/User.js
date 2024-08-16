const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  async create(username, email, hashedPassword) {
    const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
    try {
      const result = await db.query(sql, [username, email, hashedPassword]);
      return result.rows[0];
    } catch (err) {
      console.error('Error al crear usuario:', err);
      throw err;
    }
  },

  async findOneByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = $1';
    try {
      const result = await db.query(sql, [username]);
      return result.rows[0];
    } catch (err) {
      console.error('Error al buscar usuario por username:', err);
      throw err;
    }
  },

  async findOneByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    try {
      const result = await db.query(sql, [email]);
      return result.rows[0];
    } catch (err) {
      console.error('Error al buscar usuario por email:', err);
      throw err;
    }
  }
};

module.exports = User;