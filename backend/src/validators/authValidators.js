const { isValidEmail, isNonEmptyString, isStrongEnoughPassword } = require('../utils/validate');

function validateRegister(body) {
  const errors = {};
  if (!isNonEmptyString(body.name)) errors.name = 'Name is required.';
  if (!isNonEmptyString(body.email)) errors.email = 'Email is required.';
  else if (!isValidEmail(body.email)) errors.email = 'Please enter a valid email address.';
  if (!isNonEmptyString(body.password)) errors.password = 'Password is required.';
  else if (!isStrongEnoughPassword(body.password)) errors.password = 'Password must be at least 8 characters long.';
  if (!isNonEmptyString(body.confirmPassword)) errors.confirmPassword = 'Please confirm your password.';
  else if (body.password !== body.confirmPassword) errors.confirmPassword = 'Passwords do not match.';

  return { valid: Object.keys(errors).length === 0, errors };
}

function validateLogin(body) {
  const errors = {};
  if (!isNonEmptyString(body.email)) errors.email = 'Email is required.';
  if (!isNonEmptyString(body.password)) errors.password = 'Password is required.';
  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateRegister, validateLogin };
