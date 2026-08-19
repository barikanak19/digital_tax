import { request } from './api';

// ---------- Dashboard ----------
export const fetchDashboardStats = () => request('/admin/dashboard', { method: 'GET', auth: true });

// ---------- Users ----------
export const fetchUsers = () => request('/admin/users', { method: 'GET', auth: true });

// ---------- Login activity ----------
export const fetchLoginActivity = () => request('/admin/login-activity', { method: 'GET', auth: true });

// ---------- Services ----------
export const fetchServicesAdmin = () => request('/admin/services', { method: 'GET', auth: true });
export const createServiceAdmin = (payload) => request('/admin/services', { method: 'POST', body: payload, auth: true });
export const updateServiceAdmin = (id, payload) => request(`/admin/services/${id}`, { method: 'PUT', body: payload, auth: true });
export const deleteServiceAdmin = (id) => request(`/admin/services/${id}`, { method: 'DELETE', auth: true });

// ---------- Steps ----------
export const addStepAdmin = (serviceId, payload) => request(`/admin/services/${serviceId}/steps`, { method: 'POST', body: payload, auth: true });
export const updateStepAdmin = (stepId, payload) => request(`/admin/steps/${stepId}`, { method: 'PUT', body: payload, auth: true });
export const deleteStepAdmin = (stepId) => request(`/admin/steps/${stepId}`, { method: 'DELETE', auth: true });

// ---------- FAQs ----------
export const createFaqAdmin = (payload) => request('/admin/faqs', { method: 'POST', body: payload, auth: true });
export const updateFaqAdmin = (id, payload) => request(`/admin/faqs/${id}`, { method: 'PUT', body: payload, auth: true });
export const deleteFaqAdmin = (id) => request(`/admin/faqs/${id}`, { method: 'DELETE', auth: true });

// ---------- Tax calendar ----------
export const createCalendarEntryAdmin = (payload) => request('/admin/tax-calendar', { method: 'POST', body: payload, auth: true });
export const updateCalendarEntryAdmin = (id, payload) => request(`/admin/tax-calendar/${id}`, { method: 'PUT', body: payload, auth: true });
export const deleteCalendarEntryAdmin = (id) => request(`/admin/tax-calendar/${id}`, { method: 'DELETE', auth: true });

// ---------- Feedback ----------
export const fetchFeedbackAdmin = () => request('/admin/feedback', { method: 'GET', auth: true });

// ---------- Contact requests ----------
export const fetchContactRequestsAdmin = () => request('/admin/contact-requests', { method: 'GET', auth: true });
export const updateContactRequestStatusAdmin = (id, status) => request(`/admin/contact-requests/${id}`, { method: 'PUT', body: { status }, auth: true });
