const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.listServices);
router.get('/:id', serviceController.getServiceDetails);
router.get('/:id/documents', serviceController.getServiceDocuments);
router.get('/:id/steps', serviceController.getServiceSteps);
router.get('/:id/faqs', serviceController.getServiceFaqs);

module.exports = router;
