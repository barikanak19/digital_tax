/**
 * Central fetch wrapper. Reads the API base URL from Vite env
 * so it is configurable per environment (VITE_API_URL).
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('dts_token');
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw { success: false, message: 'Unable to reach the server. Please check your connection and try again.' };
  }

  let data;
  try {
    data = await response.json();
  } catch (parseErr) {
    throw { success: false, message: 'Unexpected server response.' };
  }

  if (!response.ok || data.success === false) {
    throw data;
  }
  return data;
}

export { API_URL, getToken, request };
