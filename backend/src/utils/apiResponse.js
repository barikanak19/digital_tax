/**
 * Consistent API response helpers.
 * Success: { success: true, message, data }
 * Error:   { success: false, message }
 */

function success(res, statusCode, message, data = null) {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
}

function error(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { success, error };
