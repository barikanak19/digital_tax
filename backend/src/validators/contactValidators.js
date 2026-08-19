const { isValidEmail, isValidMobile, isNonEmptyString } = require('../utils/validate');

function validateContactRequest(body) {
  const errors = {};
  const hasEmail = isNonEmptyString(body.email);
  const hasMobile = isNonEmptyString(body.mobile_number);

  if (!hasEmail && !hasMobile) {
    errors.contact = 'Please provide either a mobile number or an email address.';
  }
  if (hasEmail && !isValidEmail(body.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (hasMobile && !isValidMobile(body.mobile_number)) {
    errors.mobile_number = 'Please enter a valid mobile number.';
  }
  if (!isNonEmptyString(body.description)) {
    errors.description = 'Description is required.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateContactRequest };
