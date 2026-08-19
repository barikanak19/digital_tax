const { verifyToken } = require('../utils/token');
const { error } = require('../utils/apiResponse');

/**
 * Verifies the JWT sent in the Authorization header (Bearer <token>).
 * On success, attaches { id, email, role } to req.user.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    return error(res, 401, 'Authentication required. Please log in.');
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (err) {
    return error(res, 401, 'Invalid or expired session. Please log in again.');
  }
}

module.exports = authenticateToken;
