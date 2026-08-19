const { pool } = require('../config/db');

async function createContactRequest({ userId, mobileNumber, email, description }) {
  const [result] = await pool.query(
    'INSERT INTO contact_requests (user_id, mobile_number, email, description) VALUES (?, ?, ?, ?)',
    [userId || null, mobileNumber || null, email || null, description]
  );
  return result.insertId;
}

async function getAllContactRequests() {
  const [rows] = await pool.query(
    `SELECT cr.id, cr.mobile_number, cr.email, cr.description, cr.status, cr.created_at,
            u.name AS user_name, u.email AS user_email
     FROM contact_requests cr
     LEFT JOIN users u ON u.id = cr.user_id
     ORDER BY cr.created_at DESC`
  );
  return rows;
}

async function updateStatus(id, status) {
  const [result] = await pool.query('UPDATE contact_requests SET status = ? WHERE id = ?', [status, id]);
  return result.affectedRows > 0;
}

module.exports = { createContactRequest, getAllContactRequests, updateStatus };
