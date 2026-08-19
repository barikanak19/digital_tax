/**
 * Wraps an async route handler so thrown/rejected errors are
 * forwarded to the centralized error-handling middleware instead
 * of crashing the process or requiring a try/catch in every route.
 */
function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
