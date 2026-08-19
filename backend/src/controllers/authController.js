const bcrypt = require('bcryptjs');
const asyncHandler = require('../utils/asyncHandler');
const { success, error } = require('../utils/apiResponse');
const { signToken } = require('../utils/token');
const { validateRegister, validateLogin } = require('../validators/authValidators');
const userModel = require('../models/userModel');
const loginActivityModel = require('../models/loginActivityModel');

const SALT_ROUNDS = 10;

const register = asyncHandler(async (req, res) => {
  const { valid, errors } = validateRegister(req.body);
  if (!valid) {
    return res.status(422).json({ success: false, message: 'Validation failed.', errors });
  }

  const { name, email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await userModel.findByEmail(normalizedEmail);
  if (existing) {
    return error(res, 409, 'An account with this email already exists. Please log in instead.');
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const userId = await userModel.createUser({ name: name.trim(), email: normalizedEmail, passwordHash, role: 'user' });

  const token = signToken({ id: userId, email: normalizedEmail, role: 'user' });

  return success(res, 201, 'Registration successful.', {
    token,
    user: { id: userId, name: name.trim(), email: normalizedEmail, role: 'user' },
  });
});

const login = asyncHandler(async (req, res) => {
  const { valid, errors } = validateLogin(req.body);
  if (!valid) {
    return res.status(422).json({ success: false, message: 'Validation failed.', errors });
  }

  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const user = await userModel.findByEmail(normalizedEmail);
  if (!user) {
    return error(res, 401, 'Invalid email or password.');
  }

  if (user.status === 'disabled') {
    return error(res, 403, 'This account has been disabled. Contact support for assistance.');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return error(res, 401, 'Invalid email or password.');
  }

  await userModel.updateLastLogin(user.id);
  await loginActivityModel.recordLogin({
    userId: user.id,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
  });

  const token = signToken({ id: user.id, email: user.email, role: user.role });

  return success(res, 200, 'Login successful.', {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

const logout = asyncHandler(async (req, res) => {
  // Stateless JWT: logout is handled client-side by discarding the token.
  // This endpoint exists for API completeness and future token-blacklisting support.
  return success(res, 200, 'Logged out successfully.');
});

const me = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return error(res, 404, 'User not found.');
  }
  return success(res, 200, 'User profile fetched.', { user });
});

module.exports = { register, login, logout, me };
