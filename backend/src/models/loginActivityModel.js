const { pool } = require('../config/db');

async function recordLogin({ userId, ipAddress, userAgent }) {
  await pool.query(
    'INSERT INTO login_activity (user_id, ip_address, user_agent) VALUES (?, ?, ?)',
    [userId, ipAddress || null, userAgent || null]
  );
}

async function getAllActivity() {
  const [rows] = await pool.query(
    `SELECT la.id, la.login_at, la.ip_address, la.user_agent,
            u.id AS user_id, u.name AS user_name, u.email AS user_email
     FROM login_activity la
     JOIN users u ON u.id = la.user_id
     ORDER BY la.login_at DESC
     LIMIT 500`
  );
  return rows;
}

module.exports = { recordLogin, getAllActivity };
