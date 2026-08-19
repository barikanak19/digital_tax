const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const optionalAuth = require('../middleware/optionalAuth');

router.post('/', optionalAuth, contactController.submitContactRequest);

module.exports = router;
