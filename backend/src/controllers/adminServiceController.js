const asyncHandler = require('../utils/asyncHandler');
const { success, error } = require('../utils/apiResponse');
const serviceModel = require('../models/serviceModel');
const { validateServicePayload, slugify } = require('../validators/serviceValidators');
const { isNonEmptyString } = require('../utils/validate');

// ---------- Services ----------

const listServicesAdmin = asyncHandler(async (req, res) => {
  const services = await serviceModel.getAllServicesAdmin();
  return success(res, 200, 'Services fetched successfully.', { services });
});

const createService = asyncHandler(async (req, res) => {
  const { valid, errors } = validateServicePayload(req.body);
  if (!valid) return res.status(422).json({ success: false, message: 'Validation failed.', errors });

  const slug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.name);
  const id = await serviceModel.createService({ ...req.body, slug });
  return success(res, 201, 'Service created successfully.', { id });
});

const updateService = asyncHandler(async (req, res) => {
  const { valid, errors } = validateServicePayload(req.body, { partial: true });
  if (!valid) return res.status(422).json({ success: false, message: 'Validation failed.', errors });

  const payload = { ...req.body };
  if (payload.slug) payload.slug = slugify(payload.slug);

  const updated = await serviceModel.updateService(req.params.id, payload);
  if (!updated) return error(res, 404, 'Service not found.');
  return success(res, 200, 'Service updated successfully.');
});

const deleteService = asyncHandler(async (req, res) => {
  const deleted = await serviceModel.deleteService(req.params.id);
  if (!deleted) return error(res, 404, 'Service not found.');
  return success(res, 200, 'Service deleted successfully.');
});

// ---------- Steps ----------

const addStep = asyncHandler(async (req, res) => {
  const { step_number, step_title, step_description } = req.body;
  if (!step_number || !isNonEmptyString(step_title) || !isNonEmptyString(step_description)) {
    return error(res, 422, 'step_number, step_title and step_description are required.');
  }
  const id = await serviceModel.addStep(req.params.id, req.body);
  return success(res, 201, 'Step added successfully.', { id });
});

const updateStep = asyncHandler(async (req, res) => {
  const updated = await serviceModel.updateStep(req.params.stepId, req.body);
  if (!updated) return error(res, 404, 'Step not found.');
  return success(res, 200, 'Step updated successfully.');
});

const deleteStep = asyncHandler(async (req, res) => {
  const deleted = await serviceModel.deleteStep(req.params.stepId);
  if (!deleted) return error(res, 404, 'Step not found.');
  return success(res, 200, 'Step deleted successfully.');
});

// ---------- FAQs ----------

const createFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  if (!isNonEmptyString(question) || !isNonEmptyString(answer)) {
    return error(res, 422, 'Question and answer are required.');
  }
  const id = await serviceModel.createFaq(req.body);
  return success(res, 201, 'FAQ created successfully.', { id });
});

const updateFaq = asyncHandler(async (req, res) => {
  const updated = await serviceModel.updateFaq(req.params.id, req.body);
  if (!updated) return error(res, 404, 'FAQ not found.');
  return success(res, 200, 'FAQ updated successfully.');
});

const deleteFaq = asyncHandler(async (req, res) => {
  const deleted = await serviceModel.deleteFaq(req.params.id);
  if (!deleted) return error(res, 404, 'FAQ not found.');
  return success(res, 200, 'FAQ deleted successfully.');
});

module.exports = {
  listServicesAdmin,
  createService,
  updateService,
  deleteService,
  addStep,
  updateStep,
  deleteStep,
  createFaq,
  updateFaq,
  deleteFaq,
};
