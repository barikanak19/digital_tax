import { request } from './api';

export function submitContactRequest({ mobile_number, email, description }) {
  return request('/contact', { method: 'POST', body: { mobile_number, email, description }, auth: true });
}
