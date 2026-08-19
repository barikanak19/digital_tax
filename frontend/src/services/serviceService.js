import { request } from './api';

export function fetchServices(search) {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return request(`/services${query}`, { method: 'GET' });
}

export function fetchServiceDetails(idOrSlug) {
  return request(`/services/${idOrSlug}`, { method: 'GET' });
}

export function fetchAllFaqs() {
  return request('/faqs', { method: 'GET' });
}

export function fetchTaxCalendar() {
  return request('/tax-calendar', { method: 'GET' });
}
