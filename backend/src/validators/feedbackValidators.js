const { isNonEmptyString } = require('../utils/validate');

function validateFeedback(body) {
  const errors = {};
  const rating = Number(body.rating);
  if (!rating || rating < 1 || rating > 5) {
    errors.rating = 'Rating is required and must be between 1 and 5.';
  }
  if (!isNonEmptyString(body.description)) {
    errors.description = 'Description is required.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateFeedback };
