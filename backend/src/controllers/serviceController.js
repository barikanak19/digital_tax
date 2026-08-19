const asyncHandler = require('../utils/asyncHandler');
const { success, error } = require('../utils/apiResponse');
const serviceModel = require('../models/serviceModel');

const listServices = asyncHandler(async (req, res) => {
  const search = req.query.search ? String(req.query.search).trim() : undefined;
  const services = await serviceModel.getAllServices({ search });
  return success(res, 200, 'Services fetched successfully.', { services });
});

const getServiceDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = Number.isNaN(Number(id))
    ? await serviceModel.getServiceBySlug(id)
    : await serviceModel.getServiceById(id);

  if (!service) {
    return error(res, 404, 'Service not found.');
  }

  const [documents, steps, faqs] = await Promise.all([
    serviceModel.getDocumentsByServiceId(service.id),
    serviceModel.getStepsByServiceId(service.id),
    serviceModel.getFaqsByServiceId(service.id),
  ]);

  return success(res, 200, 'Service details fetched successfully.', {
    service,
    documents,
    steps,
    faqs,
  });
});

const getServiceDocuments = asyncHandler(async (req, res) => {
  const documents = await serviceModel.getDocumentsByServiceId(req.params.id);
  return success(res, 200, 'Documents fetched successfully.', { documents });
});

const getServiceSteps = asyncHandler(async (req, res) => {
  const steps = await serviceModel.getStepsByServiceId(req.params.id);
  return success(res, 200, 'Steps fetched successfully.', { steps });
});

const getServiceFaqs = asyncHandler(async (req, res) => {
  const faqs = await serviceModel.getFaqsByServiceId(req.params.id);
  return success(res, 200, 'FAQs fetched successfully.', { faqs });
});

const listAllFaqs = asyncHandler(async (req, res) => {
  const faqs = await serviceModel.getAllFaqs();
  return success(res, 200, 'FAQs fetched successfully.', { faqs });
});

module.exports = {
  listServices,
  getServiceDetails,
  getServiceDocuments,
  getServiceSteps,
  getServiceFaqs,
  listAllFaqs,
};
