const { pool } = require('../config/db');

async function getAllEntries() {
  const [rows] = await pool.query(
    `SELECT tc.id, tc.title, tc.due_date, tc.description, tc.status, tc.service_id, s.name AS service_name
     FROM tax_calendar tc
     LEFT JOIN services s ON s.id = tc.service_id
     ORDER BY tc.due_date ASC`
  );
  return rows;
}

async function createEntry(data) {
  const [result] = await pool.query(
    'INSERT INTO tax_calendar (service_id, title, due_date, description, status) VALUES (?, ?, ?, ?, ?)',
    [data.service_id || null, data.title, data.due_date, data.description || null, data.status || 'upcoming']
  );
  return result.insertId;
}

async function updateEntry(id, data) {
  const fields = ['service_id', 'title', 'due_date', 'description', 'status'];
  const updates = [];
  const params = [];
  fields.forEach((f) => {
    if (data[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(data[f]);
    }
  });
  if (updates.length === 0) return false;
  params.push(id);
  const [result] = await pool.query(`UPDATE tax_calendar SET ${updates.join(', ')} WHERE id = ?`, params);
  return result.affectedRows > 0;
}

async function deleteEntry(id) {
  const [result] = await pool.query('DELETE FROM tax_calendar WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { getAllEntries, createEntry, updateEntry, deleteEntry };
