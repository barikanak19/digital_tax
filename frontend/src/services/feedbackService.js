import { request } from './api';

export function submitFeedback({ rating, description, service_id }) {
  return request('/feedback', { method: 'POST', body: { rating, description, service_id }, auth: true });
}
