const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');
const requireAdmin = require('../middleware/requireAdmin');

const adminController = require('../controllers/adminController');
const adminServiceController = require('../controllers/adminServiceController');
const feedbackController = require('../controllers/feedbackController');
const contactController = require('../controllers/contactController');
const taxCalendarController = require('../controllers/taxCalendarController');

// Every route below requires a valid JWT AND the 'admin' role.
router.use(authenticateToken, requireAdmin);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Users
router.get('/users', adminController.listUsers);

// Login activity
router.get('/login-activity', adminController.listLoginActivity);

// Services CRUD
router.get('/services', adminServiceController.listServicesAdmin);
router.post('/services', adminServiceController.createService);
router.put('/services/:id', adminServiceController.updateService);
router.delete('/services/:id', adminServiceController.deleteService);

// Service steps CRUD
router.post('/services/:id/steps', adminServiceController.addStep);
router.put('/steps/:stepId', adminServiceController.updateStep);
router.delete('/steps/:stepId', adminServiceController.deleteStep);

// FAQ CRUD
router.post('/faqs', adminServiceController.createFaq);
router.put('/faqs/:id', adminServiceController.updateFaq);
router.delete('/faqs/:id', adminServiceController.deleteFaq);

// Tax calendar CRUD
router.post('/tax-calendar', taxCalendarController.createCalendarEntry);
router.put('/tax-calendar/:id', taxCalendarController.updateCalendarEntry);
router.delete('/tax-calendar/:id', taxCalendarController.deleteCalendarEntry);

// Feedback (read-only for admin)
router.get('/feedback', feedbackController.listFeedback);

// Contact requests
router.get('/contact-requests', contactController.listContactRequests);
router.put('/contact-requests/:id', contactController.updateContactRequestStatus);

module.exports = router;
