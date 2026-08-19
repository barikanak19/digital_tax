const { error } = require('../utils/apiResponse');

/**
 * Must run AFTER authenticateToken. Ensures the authenticated user
 * has the 'admin' role before allowing access to admin-only routes.
 * The frontend hiding admin menu items is NOT sufficient on its own -
 * this backend check is the actual enforcement point.
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return error(res, 401, 'Authentication required.');
  }
  if (req.user.role !== 'admin') {
    return error(res, 403, 'Access denied. Admin privileges are required for this action.');
  }
  next();
}

module.exports = requireAdmin;
