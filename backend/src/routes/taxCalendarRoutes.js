const express = require('express');
const router = express.Router();
const taxCalendarController = require('../controllers/taxCalendarController');

router.get('/', taxCalendarController.listCalendar);

module.exports = router;
