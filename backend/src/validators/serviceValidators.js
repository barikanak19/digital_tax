const { isNonEmptyString } = require('../utils/validate');

function validateServicePayload(body, { partial = false } = {}) {
  const required = [
    'name', 'short_description', 'introduction', 'purpose', 'eligibility',
    'charges', 'official_portal_name', 'official_portal_url',
    'important_information', 'final_information',
  ];
  const errors = {};
  required.forEach((field) => {
    if (partial && body[field] === undefined) return; // skip unset fields on update
    if (!isNonEmptyString(body[field])) {
      errors[field] = `${field.replace(/_/g, ' ')} is required.`;
    }
  });
  return { valid: Object.keys(errors).length === 0, errors };
}

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

module.exports = { validateServicePayload, slugify };
