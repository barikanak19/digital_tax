const { pool } = require('../config/db');

async function findByEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, name, email, password_hash, role, status, created_at, updated_at, last_login_at FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, status, created_at, updated_at, last_login_at FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

async function createUser({ name, email, passwordHash, role = 'user' }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role]
  );
  return result.insertId;
}

async function updateLastLogin(userId) {
  await pool.query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [userId]);
}

async function getAllUsers() {
  const [rows] = await pool.query(
    `SELECT id, name, email, role, status, created_at, last_login_at
     FROM users
     ORDER BY created_at DESC`
  );
  return rows;
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateLastLogin,
  getAllUsers,
};
