const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts 10-digit Indian-style numbers, optionally prefixed with +countrycode.
const MOBILE_REGEX = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
}

function isValidMobile(mobile) {
  return typeof mobile === 'string' && MOBILE_REGEX.test(mobile.trim());
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isStrongEnoughPassword(password) {
  // Minimum: 8 characters. Kept simple/appropriate for an academic project.
  return typeof password === 'string' && password.length >= 8;
}

module.exports = {
  isValidEmail,
  isValidMobile,
  isNonEmptyString,
  isStrongEnoughPassword,
};
