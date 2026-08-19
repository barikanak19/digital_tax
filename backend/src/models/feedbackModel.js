const { pool } = require('../config/db');

async function createFeedback({ userId, serviceId, rating, description }) {
  const [result] = await pool.query(
    'INSERT INTO feedback (user_id, service_id, rating, description) VALUES (?, ?, ?, ?)',
    [userId, serviceId || null, rating, description]
  );
  return result.insertId;
}

async function getAllFeedback() {
  const [rows] = await pool.query(
    `SELECT f.id, f.rating, f.description, f.created_at,
            u.name AS user_name, u.email AS user_email,
            s.name AS service_name
     FROM feedback f
     JOIN users u ON u.id = f.user_id
     LEFT JOIN services s ON s.id = f.service_id
     ORDER BY f.created_at DESC`
  );
  return rows;
}

module.exports = { createFeedback, getAllFeedback };
