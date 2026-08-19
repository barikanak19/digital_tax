const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const { pool } = require('../config/db');
const userModel = require('../models/userModel');
const loginActivityModel = require('../models/loginActivityModel');
const feedbackModel = require('../models/feedbackModel');
const contactModel = require('../models/contactModel');

const getDashboardStats = asyncHandler(async (req, res) => {
  const [[{ totalUsers }]] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users');
  const [[{ totalServices }]] = await pool.query('SELECT COUNT(*) AS totalServices FROM services WHERE is_active = 1');
  const [[{ totalFeedback }]] = await pool.query('SELECT COUNT(*) AS totalFeedback FROM feedback');
  const [[{ totalContactRequests }]] = await pool.query('SELECT COUNT(*) AS totalContactRequests FROM contact_requests');

  const [recentLoginActivity, recentFeedback, recentContactRequests] = await Promise.all([
    loginActivityModel.getAllActivity(),
    feedbackModel.getAllFeedback(),
    contactModel.getAllContactRequests(),
  ]);

  return success(res, 200, 'Dashboard stats fetched successfully.', {
    totals: { totalUsers, totalServices, totalFeedback, totalContactRequests },
    recentLoginActivity: recentLoginActivity.slice(0, 10),
    recentFeedback: recentFeedback.slice(0, 10),
    recentContactRequests: recentContactRequests.slice(0, 10),
  });
});

const listUsers = asyncHandler(async (req, res) => {
  const users = await userModel.getAllUsers();
  return success(res, 200, 'Users fetched successfully.', { users });
});

const listLoginActivity = asyncHandler(async (req, res) => {
  const activity = await loginActivityModel.getAllActivity();
  return success(res, 200, 'Login activity fetched successfully.', { activity });
});

module.exports = { getDashboardStats, listUsers, listLoginActivity };
