const { verifyToken } = require('../utils/token');

/**
 * Attaches req.user if a valid token is present, but does NOT
 * block the request if no token or an invalid token is provided.
 * Used for endpoints like /api/contact which accept both guests
 * and logged-in users.
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) return next();

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
  } catch (err) {
    // Invalid/expired token on an optional-auth route: proceed as guest.
  }
  next();
}

module.exports = optionalAuth;
