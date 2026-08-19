/**
 * Centralized error handler. Any error passed via next(err), or thrown
 * inside an asyncHandler-wrapped route, ends up here. Keeps error
 * responses consistent and avoids leaking internal details.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('[ERROR]', err.message);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  const statusCode = err.statusCode && Number.isInteger(err.statusCode)
    ? err.statusCode
    : 500;

  const message = statusCode === 500
    ? 'Something went wrong on our end. Please try again later.'
    : err.message || 'Request failed.';

  res.status(statusCode).json({ success: false, message });
}

function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

module.exports = { errorHandler, notFoundHandler };
