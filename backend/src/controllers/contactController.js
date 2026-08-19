const asyncHandler = require('../utils/asyncHandler');
const { success, error } = require('../utils/apiResponse');
const { validateContactRequest } = require('../validators/contactValidators');
const contactModel = require('../models/contactModel');

const submitContactRequest = asyncHandler(async (req, res) => {
  const { valid, errors } = validateContactRequest(req.body);
  if (!valid) {
    return res.status(422).json({ success: false, message: 'Validation failed.', errors });
  }

  const { mobile_number, email, description } = req.body;

  // req.user is only present if the request was authenticated (optional auth).
  const userId = req.user ? req.user.id : null;

  const requestId = await contactModel.createContactRequest({
    userId,
    mobileNumber: mobile_number ? mobile_number.trim() : null,
    email: email ? email.trim().toLowerCase() : null,
    description: description.trim(),
  });

  return success(res, 201, 'Your request has been submitted. We will get back to you soon.', { requestId });
});

const listContactRequests = asyncHandler(async (req, res) => {
  const requests = await contactModel.getAllContactRequests();
  return success(res, 200, 'Contact requests fetched successfully.', { requests });
});

const updateContactRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ['new', 'in_progress', 'resolved'];
  if (!allowed.includes(status)) {
    return error(res, 422, `Status must be one of: ${allowed.join(', ')}`);
  }
  const updated = await contactModel.updateStatus(req.params.id, status);
  if (!updated) {
    return error(res, 404, 'Contact request not found.');
  }
  return success(res, 200, 'Status updated successfully.');
});

module.exports = { submitContactRequest, listContactRequests, updateContactRequestStatus };
