const { pool } = require('../config/db');

async function getAllServices({ search } = {}) {
  let query = `SELECT id, name, slug, short_description, intro_image, display_order
               FROM services WHERE is_active = 1`;
  const params = [];
  if (search) {
    query += ' AND (name LIKE ? OR short_description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  query += ' ORDER BY display_order ASC, name ASC';
  const [rows] = await pool.query(query, params);
  return rows;
}

async function getServiceById(id) {
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ? AND is_active = 1 LIMIT 1', [id]);
  return rows[0] || null;
}

async function getServiceBySlug(slug) {
  const [rows] = await pool.query('SELECT * FROM services WHERE slug = ? AND is_active = 1 LIMIT 1', [slug]);
  return rows[0] || null;
}

async function getDocumentsByServiceId(serviceId) {
  const [rows] = await pool.query(
    'SELECT id, document_name, display_order FROM service_documents WHERE service_id = ? ORDER BY display_order ASC',
    [serviceId]
  );
  return rows;
}

async function getStepsByServiceId(serviceId) {
  const [rows] = await pool.query(
    'SELECT id, step_number, step_title, step_description, step_image FROM service_steps WHERE service_id = ? ORDER BY step_number ASC',
    [serviceId]
  );
  return rows;
}

async function getFaqsByServiceId(serviceId) {
  const [rows] = await pool.query(
    'SELECT id, category, question, answer, display_order FROM service_faqs WHERE service_id = ? ORDER BY display_order ASC, id ASC',
    [serviceId]
  );
  return rows;
}

async function getAllFaqs() {
  const [rows] = await pool.query(
    `SELECT f.id, f.service_id, s.name AS service_name, f.category, f.question, f.answer
     FROM service_faqs f
     LEFT JOIN services s ON s.id = f.service_id
     ORDER BY f.category ASC, f.id ASC`
  );
  return rows;
}

// ---------- Admin: services CRUD ----------

async function createService(data) {
  const [result] = await pool.query(
    `INSERT INTO services
      (name, slug, short_description, introduction, purpose, eligibility, charges,
       official_portal_name, official_portal_url, important_information, final_information,
       intro_image, middle_image, final_image, display_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name, data.slug, data.short_description, data.introduction, data.purpose, data.eligibility,
      data.charges, data.official_portal_name, data.official_portal_url, data.important_information,
      data.final_information, data.intro_image || null, data.middle_image || null, data.final_image || null,
      data.display_order || 0,
    ]
  );
  return result.insertId;
}

async function updateService(id, data) {
  const fields = [
    'name', 'slug', 'short_description', 'introduction', 'purpose', 'eligibility', 'charges',
    'official_portal_name', 'official_portal_url', 'important_information', 'final_information',
    'intro_image', 'middle_image', 'final_image', 'display_order', 'is_active',
  ];
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
  const [result] = await pool.query(`UPDATE services SET ${updates.join(', ')} WHERE id = ?`, params);
  return result.affectedRows > 0;
}

async function deleteService(id) {
  const [result] = await pool.query('DELETE FROM services WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

async function getAllServicesAdmin() {
  const [rows] = await pool.query('SELECT * FROM services ORDER BY display_order ASC, name ASC');
  return rows;
}

// ---------- Admin: steps CRUD ----------

async function addStep(serviceId, data) {
  const [result] = await pool.query(
    'INSERT INTO service_steps (service_id, step_number, step_title, step_description, step_image) VALUES (?, ?, ?, ?, ?)',
    [serviceId, data.step_number, data.step_title, data.step_description, data.step_image || null]
  );
  return result.insertId;
}

async function updateStep(stepId, data) {
  const fields = ['step_number', 'step_title', 'step_description', 'step_image'];
  const updates = [];
  const params = [];
  fields.forEach((f) => {
    if (data[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(data[f]);
    }
  });
  if (updates.length === 0) return false;
  params.push(stepId);
  const [result] = await pool.query(`UPDATE service_steps SET ${updates.join(', ')} WHERE id = ?`, params);
  return result.affectedRows > 0;
}

async function deleteStep(stepId) {
  const [result] = await pool.query('DELETE FROM service_steps WHERE id = ?', [stepId]);
  return result.affectedRows > 0;
}

// ---------- Admin: FAQ CRUD ----------

async function createFaq(data) {
  const [result] = await pool.query(
    'INSERT INTO service_faqs (service_id, category, question, answer, display_order) VALUES (?, ?, ?, ?, ?)',
    [data.service_id || null, data.category || null, data.question, data.answer, data.display_order || 0]
  );
  return result.insertId;
}

async function updateFaq(id, data) {
  const fields = ['service_id', 'category', 'question', 'answer', 'display_order'];
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
  const [result] = await pool.query(`UPDATE service_faqs SET ${updates.join(', ')} WHERE id = ?`, params);
  return result.affectedRows > 0;
}

async function deleteFaq(id) {
  const [result] = await pool.query('DELETE FROM service_faqs WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllServices,
  getServiceById,
  getServiceBySlug,
  getDocumentsByServiceId,
  getStepsByServiceId,
  getFaqsByServiceId,
  getAllFaqs,
  createService,
  updateService,
  deleteService,
  getAllServicesAdmin,
  addStep,
  updateStep,
  deleteStep,
  createFaq,
  updateFaq,
  deleteFaq,
};
