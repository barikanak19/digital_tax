const asyncHandler = require('../utils/asyncHandler');
const { success, error } = require('../utils/apiResponse');
const taxCalendarModel = require('../models/taxCalendarModel');

const listCalendar = asyncHandler(async (req, res) => {
  const entries = await taxCalendarModel.getAllEntries();
  return success(res, 200, 'Tax calendar fetched successfully.', { entries });
});

const createCalendarEntry = asyncHandler(async (req, res) => {
  const { title, due_date, description, status, service_id } = req.body;
  if (!title || !due_date) {
    return error(res, 422, 'Title and due date are required.');
  }
  const id = await taxCalendarModel.createEntry({ title, due_date, description, status, service_id });
  return success(res, 201, 'Tax calendar entry created.', { id });
});

const updateCalendarEntry = asyncHandler(async (req, res) => {
  const updated = await taxCalendarModel.updateEntry(req.params.id, req.body);
  if (!updated) return error(res, 404, 'Tax calendar entry not found.');
  return success(res, 200, 'Tax calendar entry updated.');
});

const deleteCalendarEntry = asyncHandler(async (req, res) => {
  const deleted = await taxCalendarModel.deleteEntry(req.params.id);
  if (!deleted) return error(res, 404, 'Tax calendar entry not found.');
  return success(res, 200, 'Tax calendar entry deleted.');
});

module.exports = { listCalendar, createCalendarEntry, updateCalendarEntry, deleteCalendarEntry };
