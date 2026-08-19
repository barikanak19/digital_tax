import { request } from './api';

export function register({ name, email, password, confirmPassword }) {
  return request('/auth/register', { method: 'POST', body: { name, email, password, confirmPassword } });
}

export function login({ email, password }) {
  return request('/auth/login', { method: 'POST', body: { email, password } });
}

export function logout() {
  return request('/auth/logout', { method: 'POST', auth: true });
}

export function fetchMe() {
  return request('/auth/me', { method: 'GET', auth: true });
}
