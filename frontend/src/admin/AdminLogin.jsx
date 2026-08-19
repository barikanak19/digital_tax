import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const loggedInUser = await login(form);
      if (loggedInUser.role !== 'admin') {
        setError('This account does not have admin access.');
        return;
      }
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 440 }}>
      <div className="card">
        <h1>Admin Login</h1>
        <p className="text-muted">Restricted access. Backend enforces admin-only authorization.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" className="form-input" value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" className="form-input" value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
