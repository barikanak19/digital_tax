const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/apiResponse');
const { validateFeedback } = require('../validators/feedbackValidators');
const feedbackModel = require('../models/feedbackModel');

const submitFeedback = asyncHandler(async (req, res) => {
  const { valid, errors } = validateFeedback(req.body);
  if (!valid) {
    return res.status(422).json({ success: false, message: 'Validation failed.', errors });
  }

  const { rating, description, service_id } = req.body;
  const feedbackId = await feedbackModel.createFeedback({
    userId: req.user.id,
    serviceId: service_id || null,
    rating: Number(rating),
    description: description.trim(),
  });

  return success(res, 201, 'Thank you for your feedback!', { feedbackId });
});

const listFeedback = asyncHandler(async (req, res) => {
  const feedback = await feedbackModel.getAllFeedback();
  return success(res, 200, 'Feedback fetched successfully.', { feedback });
});

module.exports = { submitFeedback, listFeedback };
